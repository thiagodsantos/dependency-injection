import { Request } from "express";
import { verify } from "@src/domain/helpers/jwt";
import { UserException } from "@src/application/exceptions/user.exception";

export const isAuthenticatedFromRequest = (req: Request): boolean => {
  const token = req.header('Authorization');
  if (!token) {
    throw UserException.invalidToken();
  }

  const isValid = verify(token);
  if (!isValid) {
    throw UserException.invalidToken();
  }

  return true;
}
