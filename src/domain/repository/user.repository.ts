import { UserEntity } from '@src/domain/entity/user.entity';
import { GetUsersDTO } from "@src/application/dto/user/get-users.dto";

export interface UserRepositoryInterface {
  addUser(userEntity: UserEntity): Promise<void>;
  updateUser(id: string, user: UserEntity): Promise<UserEntity>;
  getUserById(id: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  getUsersFromDTO(getUsersDTO: GetUsersDTO): Promise<UserEntity[]>;
}
