
import { UserRepositoryInteface } from '@src/services/repository/user.repository';
import { UserEntity } from '@src/services/entity/user.entity';
import { UserRepositoryException } from '@src/services/exception/user.repository.exception';
import { DatabaseCacheInterface } from '../database-cache';

const index = 'users';

export class CacheUserRepository implements UserRepositoryInteface {
  db: DatabaseCacheInterface;

  constructor (db: DatabaseCacheInterface) {
    this.db = db;
  }

  async updateUser(id: string, user: UserEntity): Promise<UserEntity> {
    const userEntity = await this.db.get(`${index}-${id}`);
    if (!userEntity) {
      throw UserRepositoryException.userNotFound();
    }

    await this.db.add(`${index}-${id}`, user);

    return userEntity;
  }

  async addUser(userEntity: UserEntity): Promise<UserEntity> {
    await this.db.add(`${index}-${userEntity.id}`, userEntity);

    return userEntity;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const userEntity = await this.db.get(`${index}-${id}`);
    if (!userEntity) {
      throw UserRepositoryException.userNotFound();
    }

    return userEntity;
  }

  async getAll(): Promise<UserEntity[]> {
    const keys = await this.db.listKeys();

    const usersEntity: UserEntity[] = [];

    for (const key of keys) {
      const userEntity = await this.db.get(key) as UserEntity;
      if (userEntity) {
        usersEntity.push(userEntity);
      }
    }

    return usersEntity;
  }
}