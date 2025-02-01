import { singleton } from 'tsyringe';

@singleton()
export class Cache {
  private cache: Map<string, { value: any, expiry: number }> = new Map();
  constructor() {}

  get(key: string) {
    const cachedItem = this.cache.get(key);
    if (!cachedItem) return null;
    if (cachedItem.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    return cachedItem.value;
  }

  set(key: string, value: any, ttl: number = 60000) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  clear() {
    this.cache.clear();
  }
}
