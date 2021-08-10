import { classToPlain } from "class-transformer";
import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";
import { UserModel } from "@src/infrastructure/database/mongodb/user/user.model";
import { UserRepositoryException } from "@src/domain/exception/user.repository.exception";
import {GetUsersDTO} from "@src/application/dto/user/get-users.dto";

export class UserRepository implements UserRepositoryInterface {
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

  async getUsersFromDTO(getUsersDTO: GetUsersDTO): Promise<UserEntity[]> {
    try {
      const users = await UserModel
        .find(getUsersDTO.getFilters())
        .skip(getUsersDTO.offset)
        .limit(getUsersDTO.limit)
        .exec();

      const list: UserEntity[] = [];
      if (users.length > 0) {
        for (const user of users) {
          list.push(UserEntity.fromJSON(user.toJSON() as UserEntity));
        }
      }

      return list;
    } catch (error) {
      throw UserRepositoryException.internal();
    }
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
