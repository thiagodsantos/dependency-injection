enum UserRepositoryExceptionEnum {
  USER_NOT_FOUND = 'USER.ERROR.USER_NOT_FOUND'
}

export class UserRepositoryException extends Error {
  static userNotFound = (): UserRepositoryException => {
    return new UserRepositoryException(UserRepositoryExceptionEnum.USER_NOT_FOUND);
  }
}