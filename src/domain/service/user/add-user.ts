import { AddUserDTO } from "@src/application/dto/user/add.dto";
import { UserException } from "@src/application/exceptions/user.exception";
import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";

export default class AddUserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async fromDTO(addUserDTO: AddUserDTO): Promise<void> {
    const userExists = await this.userRepository.getUserByEmail(addUserDTO.email);
    if (userExists) {
      throw UserException.existsByEmail(addUserDTO.email);
    }

    const userEntity = UserEntity.fromAddUserDTO(addUserDTO);
    await this.userRepository.addUser(userEntity);
  }
}
