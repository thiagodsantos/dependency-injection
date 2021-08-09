enum UserRepositoryExceptionEnum {
  INTERNAL = 'USER.ERROR.INTERNAL',
  USER_NOT_FOUND = 'USER.ERROR.NOT_FOUND',
  USER_NOT_ADDED = 'USER.ERROR.NOT_ADDED'
}

export class UserRepositoryException extends Error {
  static userNotFound = (): UserRepositoryException => {
    return new UserRepositoryException(UserRepositoryExceptionEnum.USER_NOT_FOUND);
  }

  static userNotAdded = (): UserRepositoryException => {
    return new UserRepositoryException(UserRepositoryExceptionEnum.USER_NOT_ADDED);
  }

  static internal = (): UserRepositoryException => {
    return new UserRepositoryException(UserRepositoryExceptionEnum.INTERNAL);
  }
}
