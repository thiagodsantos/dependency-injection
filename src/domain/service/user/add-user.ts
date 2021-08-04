import { UserRepositoryInteface } from "@src/domain/repository/user.repository";
import { AddUserDTO } from "@src/application/dto/user/add.dto";
import {UserException} from "@src/application/exceptions/user.exception";

export default class AddUserService {
  private readonly userRepository: UserRepositoryInteface;

  constructor(userRepository: UserRepositoryInteface) {
    this.userRepository = userRepository;
  }

  async fromDTO(addUserDTO: AddUserDTO) {
    const userExists = await this.userRepository.getUserByEmail(addUserDTO.email);
    if (userExists) {
      throw UserException.existsByEmail(addUserDTO.email);
    }
  }
}
