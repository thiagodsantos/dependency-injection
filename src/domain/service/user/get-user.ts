import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { UserEntity } from "@src/domain/entity/user.entity";

export default class GetUserService {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async getUserByUID(uid: string): Promise<UserEntity | null> {
    return await this.userRepository.getUserByUID(uid);
  }
}
