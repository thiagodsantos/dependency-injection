import { AddUserDTO } from '@src/application/dto/user/add.dto';

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
}
