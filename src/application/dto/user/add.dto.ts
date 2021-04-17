import { IsNotEmpty } from 'class-validator';

export class AddUserDTO {
  @IsNotEmpty({ message: 'ADD-USER.ERROR.EMPTY_EMAIL' })
  email: string;

  @IsNotEmpty({ message: 'ADD-USER.ERROR.EMPTY_NAME' })
  name: string;

  private constructor () {
  }

  static fromBody(body: AddUserDTO): Readonly<AddUserDTO> {
    const instance = new AddUserDTO();
    instance.email = body.email;
    instance.name = body.name;

    return instance;
  }
}