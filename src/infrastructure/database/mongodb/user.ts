import { UserRepositoryInteface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";

export class UserRepository implements UserRepositoryInteface {
  constructor() {

  }

  addUser(user: UserEntity): Promise<UserEntity> {
    throw new Error('NOT_IMPLEMENTED');
  }

  getAll(): Promise<UserEntity[]> {
    throw new Error('NOT_IMPLEMENTED');
  }

  getUserById(id: string): Promise<UserEntity> {
    throw new Error('NOT_IMPLEMENTED');
  }

  getUserByEmail(cpf: string): Promise<UserEntity> {
    throw new Error('NOT_IMPLEMENTED');
  }

  updateUser(id: string, user: UserEntity): Promise<UserEntity> {
    throw new Error('NOT_IMPLEMENTED');
  }
}
