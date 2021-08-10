import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { GetUsersDTO } from "@src/application/dto/user/get-users.dto";
import { UserEntity } from "@src/domain/entity/user.entity";

export default class GetUsersService {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async getUsersFromDTO(getUsersDTO: GetUsersDTO): Promise<UserEntity[]> {
    return await this.userRepository.getUsersFromDTO(getUsersDTO);
  }
}
