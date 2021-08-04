enum UserControllerExceptionEnum {
  INVALID_PARAMETERS = 'USER.ERROR.INVALID_PARAMETERS'
}

export class UserControllerException extends Error {
  static invalidParameters = (): UserControllerException => {
    return new UserControllerException(UserControllerExceptionEnum.INVALID_PARAMETERS);
  }
}