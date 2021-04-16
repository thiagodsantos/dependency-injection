import { UserRepositoryInteface } from '@src/services/repository/user.repository';
import { UserEntity } from '@src/services/entity/user.entity';
import { UserRepositoryException } from '@src/services/exception/user.repository.exception';

const usersPopulatedEntity: UserEntity[] = [];
usersPopulatedEntity.push({
  id: 'h9uwef9h7wgf',
  email: 'thiagosantos@teste.com',
  name: 'Thiago Santos'
});
usersPopulatedEntity.push({
  id: 'y4h9u5yhu946',
  email: 'thiagosilva@teste.com',
  name: 'Thiago Silva'
});

export class UserMemory implements UserRepositoryInteface {
  getUserById = async (id: string): Promise<UserEntity> => {
    for (const userPopulated of usersPopulatedEntity) {
      if (userPopulated.id === id) {
        return userPopulated;
      }
    }

    throw UserRepositoryException.userNotFound();
  }
}