import { classToPlain } from "class-transformer";
import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";
import { UserRepositoryException } from "@src/domain/exception/user.repository.exception";
import { GetUsersDTO } from "@src/application/dto/user/get-users.dto";
import { IUserModel} from "@src/infrastructure/database/mongodb/user/user.types";
import { UserModel } from "@src/infrastructure/database/mongodb/user/user.model";

export class UserRepository implements UserRepositoryInterface {
  private readonly userModel: IUserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async addUser(userEntity: UserEntity): Promise<void> {
    try {
      const model = new this.userModel(classToPlain(userEntity));
      await model.save();
    } catch (error) {
      console.error(error);
      throw UserRepositoryException.userNotAdded();
    }
  }

  async getUsersFromDTO(getUsersDTO: GetUsersDTO): Promise<UserEntity[]> {
    type FiltersType = {
      name?: {
        $regex: RegExp
      },
      email?: string
    }

    const filters: FiltersType = {};

    if (getUsersDTO.email) {
      filters.email = getUsersDTO.email
    }

    if (getUsersDTO.name) {
      filters.name = {
        $regex: new RegExp(getUsersDTO.name, 'ig')
      }
    }

    try {
      const users = await this.userModel
        .find(filters)
        .skip(getUsersDTO.offset)
        .limit(getUsersDTO.limit)
        .exec();

      const list: UserEntity[] = [];
      if (users.length > 0) {
        for (const user of users) {
          list.push(UserEntity.fromJSON(user.toJSON()));
        }
      }

      return list;
    } catch (error) {
      throw UserRepositoryException.internal();
    }
  }

  async getUserByUID(uid: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findOne({ uid }).exec();
      return user ? UserEntity.fromJSON(user.toJSON()) : null;
    } catch (error) {}
    throw UserRepositoryException.internal();
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user ? UserEntity.fromJSON(user.toJSON()) : null;
    } catch (error) {
      throw UserRepositoryException.internal();
    }
  }

  updateUser(id: string, user: UserEntity): Promise<UserEntity> {
    throw new Error('NOT_IMPLEMENTED');
  }
}
