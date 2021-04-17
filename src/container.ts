
import { UserRepositoryInteface } from '@src/services/repository/user.repository';
import { CacheUserRepository } from '@src/infrastructure/database/cache/node-cache/user.cache';
import {
  DatabaseNodeCache,
  DatabaseCacheInterface
} from './infrastructure/database/cache/database-cache';

const databaseCache = new DatabaseNodeCache();

export const providers = {
  cache: (): DatabaseCacheInterface => {
    return databaseCache;
  }
}

export const services = {
  user: (): UserRepositoryInteface => {
    return new CacheUserRepository(providers.cache());
  }
}