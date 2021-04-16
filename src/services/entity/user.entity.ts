export class UserEntity {
  id!: string;
  name!: string;
  email!: string;

  private constructor() {
  }

  static create = (userEntity: UserEntity): UserEntity => {
    const instance = new UserEntity();
    instance.id = userEntity.id;
    instance.name = userEntity.name;
    instance.email = userEntity.email;

    return instance;
  }
}