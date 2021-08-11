import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { UserException } from "@src/application/exceptions/user.exception";
import { UserRepositoryException } from "@src/domain/exception/user.repository.exception";
import { UpdateUserDTO } from "@src/application/dto/user/update.dto";
import {UserEntity} from "@src/domain/entity/user.entity";

export default class UpdateUserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async updateUserFromDTO(updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
    const user = await this.userRepository.getUserByUID(updateUserDTO.uid);
    if (!user) {
      throw UserRepositoryException.userNotFound();
    }

    const userExistsByEmail = await this.userRepository.getUserByEmail(updateUserDTO.email);

    if (userExistsByEmail && userExistsByEmail.uid !== updateUserDTO.uid) {
      throw UserException.existsByEmail(updateUserDTO.email);
    }

    user.updateFromDTO(updateUserDTO);

    await this.userRepository.updateUser(user);

    return user;
  }
}
