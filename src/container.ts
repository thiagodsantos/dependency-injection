import { UserRepositoryInteface } from '@src/services/repository/user.repository';
import { UserMemory } from '@src/infrastructure/database/memory/user.memory';

export const services = {
  user: (): UserRepositoryInteface => {
    return new UserMemory();
  }
}