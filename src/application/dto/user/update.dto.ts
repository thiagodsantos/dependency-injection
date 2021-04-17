import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty({ message: 'ADD-USER.ERROR.EMPTY_EMAIL' })
  email: string;

  @IsNotEmpty({ message: 'ADD-USER.ERROR.EMPTY_NAME' })
  name: string;

  private constructor () {
  }

  static fromBody(body: UpdateUserDTO): Readonly<UpdateUserDTO> {
    const instance = new UpdateUserDTO();
    instance.email = body.email;
    instance.name = body.name;

    return instance;
  }
}