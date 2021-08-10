import { v4 as uuidv4 } from "uuid";
import { hash } from "@src/domain/helpers/bcrypt";
import { AddUserDTO } from "@src/application/dto/user/add.dto";
import { UserException } from "@src/application/exceptions/user.exception";
import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";

export default class AddUserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async fromDTO(addUserDTO: AddUserDTO): Promise<string> {
    const userExists = await this.userRepository.getUserByEmail(addUserDTO.email);
    if (userExists) {
      throw UserException.existsByEmail(addUserDTO.email);
    }

    const userEntity = UserEntity.fromAddUserDTO(addUserDTO);

    userEntity.uid = uuidv4();
    userEntity.password = hash(addUserDTO.password);

    await this.userRepository.addUser(userEntity);

    return userEntity.uid;
  }
}

