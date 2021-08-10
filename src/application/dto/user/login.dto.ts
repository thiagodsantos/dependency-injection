import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsEmail({}, { message: "LOGIN.ERRORS.INVALID_EMAIL" })
  @IsNotEmpty({ message: "LOGIN.ERRORS.EMPTY_EMAIL" })
  email: string;

  @IsNotEmpty({ message: "LOGIN.ERRORS.EMPTY_PASSWORD" })
  password: string;

  private constructor() {
  }

  static fromBody(body: LoginDTO): Readonly<LoginDTO> {
    const instance = new LoginDTO();
    instance.email = body.email;
    instance.password = body.password;

    return instance;
  }
}
