import {validate} from "class-validator";
import { Request, Response } from "express";
import { Container, ContainerServiceInstanceEnum } from "@src/container";
import { HttpsError } from "@src/application/helpers/exception/https";
import { UserException } from "@src/application/exceptions/user.exception";
import { HttpsResponse } from "@src/application/helpers/https/response";
import { isAuthenticatedFromRequest } from "@src/application/authentication/token";
import { UpdateUserDTO}  from "@src/application/dto/user/update.dto";
import UpdateUserService from "@src/domain/service/user/update-user";

export default async (req: Request, res: Response) => {
  try {
    isAuthenticatedFromRequest(req);

    const updateUserDTO = await getDTOFromRequestAndValidateDTO(req);

    const updateUserService: UpdateUserService = Container.getServiceInstance(ContainerServiceInstanceEnum.UPDATE_USER_SERVICE);
    await updateUserService.updateUserFromDTO(updateUserDTO);

    HttpsResponse.success(res);
  } catch (error) {
    HttpsError.fromResponse(res, error);
  }
}

const getDTOFromRequestAndValidateDTO = async (req: Request): Promise<UpdateUserDTO> => {
  const updateUserDTO = UpdateUserDTO.fromBody(req.body);
  const details = await validate(updateUserDTO);
  if (details.length > 0) {
    throw UserException.invalidParameters(details);
  }

  return updateUserDTO;
}
