import { EventEmitter } from 'events';
interface DatabaseOptions {
    autoSave?: boolean;
    saveTimeout?: number;
    pretty?: boolean;
}
interface QueryOptions {
    limit?: number;
    skip?: number;
    sort?: {
        [key: string]: 'asc' | 'desc';
    };
}
declare class RaiDB extends EventEmitter {
    private data;
    private filePath;
    private options;
    private saveTimeout;
    constructor(filePath: string, options?: DatabaseOptions);
    private load;
    private scheduleSave;
    save(): Promise<void>;
    set(key: string, value: any): void;
    get(key: string): any;
    has(key: string): boolean;
    delete(key: string): boolean;
    clear(): void;
    find(query: object, options?: QueryOptions): any[];
    private matchQuery;
    count(query?: object): number;
    toJSON(): object;
}
export default RaiDB;
