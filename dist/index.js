"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const events_1 = require("events");
class RaiDB extends events_1.EventEmitter {
    constructor(filePath, options = {}) {
        var _a, _b, _c;
        super();
        this.filePath = path.resolve(filePath);
        this.data = {};
        this.saveTimeout = null;
        this.options = {
            autoSave: (_a = options.autoSave) !== null && _a !== void 0 ? _a : true,
            saveTimeout: (_b = options.saveTimeout) !== null && _b !== void 0 ? _b : 1000,
            pretty: (_c = options.pretty) !== null && _c !== void 0 ? _c : false
        };
        this.load();
    }
    async load() {
        try {
            const content = await fs.readFile(this.filePath, 'utf-8');
            this.data = JSON.parse(content);
            this.emit('loaded');
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                await this.save();
            }
            else {
                throw error;
            }
        }
    }
    scheduleSave() {
        if (!this.options.autoSave)
            return;
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        this.saveTimeout = setTimeout(() => {
            this.save();
        }, this.options.saveTimeout);
    }
    async save() {
        const content = this.options.pretty
            ? JSON.stringify(this.data, null, 2)
            : JSON.stringify(this.data);
        await fs.writeFile(this.filePath, content, 'utf-8');
        this.emit('saved');
    }
    set(key, value) {
        this.data[key] = value;
        this.scheduleSave();
        this.emit('updated', { key, value });
    }
    get(key) {
        return this.data[key];
    }
    has(key) {
        return key in this.data;
    }
    delete(key) {
        if (this.has(key)) {
            delete this.data[key];
            this.scheduleSave();
            this.emit('deleted', { key });
            return true;
        }
        return false;
    }
    clear() {
        this.data = {};
        this.scheduleSave();
        this.emit('cleared');
    }
    find(query, options = {}) {
        let results = Object.entries(this.data)
            .filter(([_, value]) => this.matchQuery(value, query))
            .map(([_, value]) => value);
        if (options.sort) {
            const [[key, order]] = Object.entries(options.sort);
            results.sort((a, b) => {
                if (order === 'asc')
                    return a[key] > b[key] ? 1 : -1;
                return a[key] < b[key] ? 1 : -1;
            });
        }
        if (options.skip)
            results = results.slice(options.skip);
        if (options.limit)
            results = results.slice(0, options.limit);
        return results;
    }
    matchQuery(item, query) {
        return Object.entries(query).every(([key, value]) => {
            if (value && typeof value === 'object') {
                return this.matchQuery(item[key], value);
            }
            return item[key] === value;
        });
    }
    count(query = {}) {
        return this.find(query).length;
    }
    toJSON() {
        return { ...this.data };
    }
}
exports.default = RaiDB;
