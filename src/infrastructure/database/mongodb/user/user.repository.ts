import { classToPlain } from "class-transformer";
import { UserRepositoryInteface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";
import { UserModel } from "@src/infrastructure/database/mongodb/user/user.model";
import { UserRepositoryException } from "@src/domain/exception/user.repository.exception";

export class UserRepository implements UserRepositoryInteface {
  constructor() {
  }

  async addUser(userEntity: UserEntity): Promise<void> {
    try {
      const model = new UserModel(classToPlain(userEntity));
      await model.save();
    } catch (error) {
      console.error(error);
      throw UserRepositoryException.userNotAdded();
    }
  }

  getAll(): Promise<UserEntity[]> {
    throw new Error('NOT_IMPLEMENTED');
  }

  getUserById(id: string): Promise<UserEntity> {
    throw new Error('NOT_IMPLEMENTED');
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await UserModel.findOne({ email }).exec();
      return user ? user.toJSON() as UserEntity : null;
    } catch (error) {
      throw UserRepositoryException.internal();
    }
  }

  updateUser(id: string, user: UserEntity): Promise<UserEntity> {
    throw new Error('NOT_IMPLEMENTED');
  }
}
