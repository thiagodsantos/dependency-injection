import { compare } from "@src/domain/helpers/bcrypt";
import { sign } from "@src/domain/helpers/jwt";
import { UserRepositoryInterface } from "@src/domain/repository/user.repository";
import { LoginDTO } from "@src/application/dto/user/login.dto";
import { UserRepositoryException } from "@src/domain/exception/user.repository.exception";

export default class LoginService {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async fromDTO(loginDTO: LoginDTO): Promise<string> {
    const user = await this.userRepository.getUserByEmail(loginDTO.email);
    if (!user) {
      throw UserRepositoryException.userNotFound();
    }

    const isValidPassword = compare(loginDTO.password, user.password);
    if (!isValidPassword) {
      throw UserRepositoryException.userNotFound();
    }

    return sign({ uid: user.uid });
  }
}
