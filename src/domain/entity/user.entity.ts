import { AddUserDTO } from '@src/application/dto/user/add.dto';
import { v4 as uuidv4 } from 'uuid';

export class UserEntity {
  id!: string;
  name!: string;
  email!: string;

  private constructor() {
  }

  static fromAddUserDTO(addUserDTO: AddUserDTO): UserEntity {
    const instance = new UserEntity();
    instance.id = uuidv4();
    instance.name = addUserDTO.name;
    instance.email = addUserDTO.email;

    return instance;
  }

  static fromJSON(json: UserEntity) {
    const instance = new UserEntity();
    instance.id = json.id;
    instance.name = json.name;
    instance.email = json.email;

    return instance;
  }
}
