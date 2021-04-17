import { UserEntity } from '@src/services/entity/user.entity';

export interface UserRepositoryInteface {
  addUser(user: UserEntity): Promise<UserEntity>;
  updateUser(id: string, user: UserEntity): Promise<UserEntity>;
  getUserById(id: string): Promise<UserEntity>;
  getAll(): Promise<UserEntity[]>;
}