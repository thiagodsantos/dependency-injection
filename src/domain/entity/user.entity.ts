import { AddUserDTO } from '@src/application/dto/user/add.dto';
import { UpdateUserDTO } from '@src/application/dto/user/update.dto';

export class UserEntity {
  name!: string;
  email!: string;

  private constructor() {
  }

  static fromAddUserDTO(addUserDTO: AddUserDTO): UserEntity {
    const instance = new UserEntity();
    instance.name = addUserDTO.name;
    instance.email = addUserDTO.email;

    return instance;
  }

  updateFromUpdateUserDTO(updateUserDTO: UpdateUserDTO) {
    this.email = updateUserDTO.email;
    this.name = updateUserDTO.name;
  }
}
