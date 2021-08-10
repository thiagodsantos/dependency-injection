import { AddUserDTO } from '@src/application/dto/user/add-user.dto';
import { UpdateUserDTO } from "@src/application/dto/user/update.dto";

export class UserEntity {
  uid!: string;
  name!: string;
  email!: string;
  password!: string;

  private constructor() {
  }

  static fromAddUserDTO(addUserDTO: AddUserDTO): UserEntity {
    const instance = new UserEntity();
    instance.name = addUserDTO.name;
    instance.email = addUserDTO.email;

    return instance;
  }

  static fromJSON(json: UserEntity) {
    const instance = new UserEntity();
    instance.uid = json.uid;
    instance.name = json.name;
    instance.email = json.email;

    return instance;
  }

  updateFromDTO(updateUserDTO: UpdateUserDTO) {
    if (this.email !== updateUserDTO.email) {
      this.email = updateUserDTO.email;
    }

    if (this.name !== updateUserDTO.name) {
      this.name = updateUserDTO.name;
    }
  }
}
