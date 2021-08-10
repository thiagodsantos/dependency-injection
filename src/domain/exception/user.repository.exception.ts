import { HttpsError } from "@src/application/helpers/exception/https";
import { ResponseStatusCodeEnum } from "@src/application/helpers/https/response";

enum UserRepositoryExceptionEnum {
  INTERNAL = 'USER.ERROR.INTERNAL',
  USER_NOT_FOUND = 'USER.ERROR.NOT_FOUND',
  USER_NOT_ADDED = 'USER.ERROR.NOT_ADDED'
}

export class UserRepositoryException extends HttpsError {
  static userNotFound = (): UserRepositoryException => {
    return new UserRepositoryException(ResponseStatusCodeEnum.NOT_FOUND, UserRepositoryExceptionEnum.USER_NOT_FOUND);
  }

  static userNotAdded = (): UserRepositoryException => {
    return new UserRepositoryException(ResponseStatusCodeEnum.BAD_REQUEST, UserRepositoryExceptionEnum.USER_NOT_ADDED);
  }

  static internal = (): UserRepositoryException => {
    return new UserRepositoryException(ResponseStatusCodeEnum.INTERNAL, UserRepositoryExceptionEnum.INTERNAL);
  }
}
