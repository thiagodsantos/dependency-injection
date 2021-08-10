// Mongo Repository
import { UserRepository } from "@src/infrastructure/database/mongodb/user/user.repository";

// Domain Repository
import { UserRepositoryInterface } from "@src/domain/repository/user.repository";

// Services
import AddUserService from "@src/domain/service/user/add-user";
import GetUsersService from "@src/domain/service/user/get-users";

// Types
type InstancesType = {
  id: ContainerRepositoryInstanceEnum | ContainerServiceInstanceEnum,
  instance: Function
}

// Enums
export enum ContainerRepositoryInstanceEnum {
  USER_REPOSITORY = 'USER_REPOSITORY',
}

export enum ContainerServiceInstanceEnum {
  ADD_USER_SERVICE = 'ADD_USER_SERVICE',
  GET_USERS_SERVICE = 'GET_USERS_SERVICE'
}

export class Container {
  static getRepositoryInstance = (id: ContainerRepositoryInstanceEnum) => {
    for (const repository of repositoryInstances) {
      if (repository.id === id) {
        return repository.instance();
      }
    }

    throw new Error('Repository instance not found in container');
  }

  static getServiceInstance = (id: ContainerServiceInstanceEnum) => {
    for (const service of serviceInstances) {
      if (service.id === id) {
        return service.instance();
      }
    }

    throw new Error('Service instance not found in container');
  }
}

// Repositories
const repositoryInstances: InstancesType[] = [
  {
    id: ContainerRepositoryInstanceEnum.USER_REPOSITORY,
    instance: function (): UserRepositoryInterface {
      return new UserRepository();
    }
  }
];

// Services
const serviceInstances: InstancesType[] = [
  {
    id: ContainerServiceInstanceEnum.ADD_USER_SERVICE,
    instance: function () {
      return new AddUserService(Container.getRepositoryInstance(ContainerRepositoryInstanceEnum.USER_REPOSITORY));
    }
  },
  {
    id: ContainerServiceInstanceEnum.GET_USERS_SERVICE,
    instance: function () {
      return new GetUsersService(Container.getRepositoryInstance(ContainerRepositoryInstanceEnum.USER_REPOSITORY));
    }
  }
];

// Validates
const validateUniqueInstances = (instances: InstancesType[]) => {
  type InstancesTAddedype = {
    id: ContainerRepositoryInstanceEnum | ContainerServiceInstanceEnum
  }

  const instancesAdded: InstancesTAddedype[] = [];

  for (const { id } of instances) {
    const hasInstance = instancesAdded.filter(instance => instance.id === id);
    if (hasInstance.length > 0) {
      throw new Error('Instance ' + id + ' duplicated');
    }

    instancesAdded.push({ id });
  }

  return instancesAdded;
}

// Boot
(() => {
  validateUniqueInstances(repositoryInstances);
  validateUniqueInstances(serviceInstances);
})();
