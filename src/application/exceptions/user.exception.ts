import { HttpsError } from "@src/application/helpers/exception/https";
import { ResponseStatusCodeEnum } from "@src/application/helpers/https/response";

export class UserException extends HttpsError {
  static invalidParameters = (details: unknown): UserException => {
    return new UserException(ResponseStatusCodeEnum.BAD_REQUEST, 'USER.ERROR.INVALID_PARAMETERS', details);
  }

  static existsByEmail = (email: string): UserException => {
    return new UserException(ResponseStatusCodeEnum.BAD_REQUEST, 'USER.ERROR.EXISTS_BY_EMAIL', email);
  }

  static invalidToken = (): UserException => {
    return new UserException(ResponseStatusCodeEnum.UNAUTHORIZED, 'USER.ERROR.INVALID_TOKEN');
  }
}
