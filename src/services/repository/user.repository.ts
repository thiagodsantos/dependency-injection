import { UserEntity } from '@src/services/entity/user.entity';

export interface UserRepositoryInteface {
  getUserById(id: string): Promise<UserEntity>;
}