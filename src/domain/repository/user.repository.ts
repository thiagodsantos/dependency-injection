import { UserEntity } from '@src/domain/entity/user.entity';

export interface UserRepositoryInteface {
  addUser(user: UserEntity): Promise<UserEntity>;
  updateUser(id: string, user: UserEntity): Promise<UserEntity>;
  getUserById(id: string): Promise<UserEntity>;
  getUserByEmail(cpf: string): Promise<UserEntity | null>;
  getAll(): Promise<UserEntity[]>;
}
