import { UserEntity } from '@src/domain/entity/user.entity';

export interface UserRepositoryInteface {
  addUser(userEntity: UserEntity): Promise<void>;
  updateUser(id: string, user: UserEntity): Promise<UserEntity>;
  getUserById(id: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  getAll(): Promise<UserEntity[]>;
}
