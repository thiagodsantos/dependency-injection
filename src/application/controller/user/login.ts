import { validate } from "class-validator";
import { Request, Response } from "express";
import { HttpsError } from "@src/application/helpers/exception/https";
import { UserException } from "@src/application/exceptions/user.exception";
import { Container, ContainerServiceInstanceEnum } from "@src/container";
import { LoginDTO } from "@src/application/dto/user/login.dto";
import { HttpsResponse } from "@src/application/helpers/https/response";
import LoginService from "@src/domain/service/user/login";

export default async (req: Request, res: Response) => {
  try {
    const loginDTO = await getDTOFromRequestAndValidateDTO(req);

    const loginService: LoginService = Container.getServiceInstance(ContainerServiceInstanceEnum.LOGIN_SERVICE);
    const token = await loginService.fromDTO(loginDTO);

    return HttpsResponse.data(res, { access_token: token });
  } catch (error) {
    return HttpsError.fromResponse(res, error);
  }
}

const getDTOFromRequestAndValidateDTO = async (req: Request): Promise<LoginDTO> => {
  const getUsersDTO = LoginDTO.fromBody(req.body);
  const details = await validate(getUsersDTO);
  if (details.length > 0) {
    throw UserException.invalidParameters(details);
  }

  return getUsersDTO;
}
