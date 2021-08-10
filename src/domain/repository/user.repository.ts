import { UserEntity } from '@src/domain/entity/user.entity';
import { GetUsersDTO } from "@src/application/dto/user/get-users.dto";

export interface UserRepositoryInterface {
  addUser(userEntity: UserEntity): Promise<void>;
  updateUser(userEntity: UserEntity): Promise<void>;
  getUserByUID(uid: string): Promise<UserEntity | null>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  getUsersFromDTO(getUsersDTO: GetUsersDTO): Promise<UserEntity[]>;
}
