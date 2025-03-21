import * as fs from 'fs-extra';
import { ensureFileSync } from 'fs-extra';
import * as path from 'path';
import { EventEmitter } from 'events';

interface DatabaseOptions {
  autoSave?: boolean;
  saveTimeout?: number;
  pretty?: boolean;
}

interface QueryOptions {
  limit?: number;
  skip?: number;
  sort?: { [key: string]: 'asc' | 'desc' };
}

class RaiDB extends EventEmitter {
  private data: { [key: string]: any };
  private filePath: string;
  private options: Required<DatabaseOptions>;
  private saveTimeout: NodeJS.Timeout | null;

  constructor(filePath: string, options: DatabaseOptions = {}) {
    super();
    this.filePath = path.resolve(filePath);
    this.data = {};
    this.saveTimeout = null;
    this.options = {
      autoSave: options.autoSave ?? true,
      saveTimeout: options.saveTimeout ?? 1000,
      pretty: options.pretty ?? false
    };

    this.load();
  }

  private async load(): Promise<void> {
    try {
      ensureFileSync(this.filePath);
      const content = await fs.readFile(this.filePath, 'utf-8');
      this.data = content ? JSON.parse(content) : {};
      this.emit('loaded');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await this.save();
      } else {
        throw error;
      }
    }
  }

  private scheduleSave(): void {
    if (!this.options.autoSave) return;

    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    this.saveTimeout = setTimeout(() => {
      this.save();
    }, this.options.saveTimeout);
  }

  public async save(): Promise<void> {
    try {
      ensureFileSync(this.filePath);
      const content = this.options.pretty
        ? JSON.stringify(this.data, null, 2)
        : JSON.stringify(this.data);

      await fs.writeFile(this.filePath, content, 'utf-8');
      this.emit('saved');
    } catch (error) {
      throw new Error(`Failed to save database: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  public set(key: string, value: any): void {
    this.data[key] = value;
    this.scheduleSave();
    this.emit('updated', { key, value });
  }

  public get(key: string): any {
    return this.data[key];
  }

  public has(key: string): boolean {
    return key in this.data;
  }

  public delete(key: string): boolean {
    if (this.has(key)) {
      delete this.data[key];
      this.scheduleSave();
      this.emit('deleted', { key });
      return true;
    }
    return false;
  }

  public clear(): void {
    this.data = {};
    this.scheduleSave();
    this.emit('cleared');
  }

  public find(query: object, options: QueryOptions = {}): any[] {
    let results = Object.entries(this.data)
      .filter(([_, value]) => this.matchQuery(value, query))
      .map(([_, value]) => value);

    if (options.sort) {
      const [[key, order]] = Object.entries(options.sort);
      results.sort((a, b) => {
        if (order === 'asc') return a[key] > b[key] ? 1 : -1;
        return a[key] < b[key] ? 1 : -1;
      });
    }

    if (options.skip) results = results.slice(options.skip);
    if (options.limit) results = results.slice(0, options.limit);

    return results;
  }

  private matchQuery(item: any, query: object): boolean {
    return Object.entries(query).every(([key, value]) => {
      if (value && typeof value === 'object') {
        return this.matchQuery(item[key], value);
      }
      return item[key] === value;
    });
  }

  public count(query: object = {}): number {
    return this.find(query).length;
  }

  public toJSON(): object {
    return { ...this.data };
  }
}

export default RaiDB;