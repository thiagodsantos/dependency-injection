import NodeCache from 'node-cache';

export interface DatabaseCacheInterface {
  add(key: string, value: any): Promise<void>;
  remove(key: string): Promise<void>;
  get(key: string): Promise<any>;
  listKeys(): Promise<string[]>;
}

export class DatabaseNodeCache implements DatabaseCacheInterface {
  db: NodeCache;

  constructor () {
    this.db = new NodeCache();
  }

  async add(key: string, value: any): Promise<void> {
    this.db.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this.db.get(key);
  }

  async remove(key: string): Promise<void> {
    this.db.del(key);
  }

  async listKeys(): Promise<string[]> {
    return this.db.keys();
  }
}