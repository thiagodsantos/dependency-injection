import { hashSync } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { AddUserDTO } from "@src/application/dto/user/add.dto";
import { UserException } from "@src/application/exceptions/user.exception";
import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 5;

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
    userEntity.password = hashSync(addUserDTO.password, BCRYPT_SALT_ROUNDS);

    await this.userRepository.addUser(userEntity);

    return userEntity.uid;
  }
}

