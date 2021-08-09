// Mongo Repository
import { UserRepository } from "@src/infrastructure/database/mongodb/user/user.repository";

// Domain Repository
import { UserRepositoryInteface } from "@src/domain/repository/user.repository";

// Services
import AddUserService from "@src/domain/service/user/add-user";

// Mongo Models
// import { UserModel } from "@src/infrastructure/database/mongodb/user/user.model";

type InstancesType = {
  id: ContainerRepositoryInstanceEnum | ContainerServiceInstanceEnum,
  instance: Function
}

export enum ContainerRepositoryInstanceEnum {
  USER_REPOSITORY = 'USER_REPOSITORY'
}

export enum ContainerServiceInstanceEnum {
  ADD_USER_SERVICE = 'ADD_USER_SERVICE'
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

const repositoryInstances: InstancesType[] = [
  {
    id: ContainerRepositoryInstanceEnum.USER_REPOSITORY,
    instance: function (): UserRepositoryInteface {
      return new UserRepository();
    }
  }
];

const serviceInstances: InstancesType[] = [
  {
    id: ContainerServiceInstanceEnum.ADD_USER_SERVICE,
    instance: function () {
      return new AddUserService(Container.getRepositoryInstance(ContainerRepositoryInstanceEnum.USER_REPOSITORY));
    }
  }
]

/*
const checkDuplicateInstance = (instances: InstancesType[]): boolean => {
  if (instances.length === 0) {
    console.info('No instances');
  }

  for (const instance of instances) {

  }
}*/
