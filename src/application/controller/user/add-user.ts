import { Request, Response } from "express";
import { validate } from "class-validator";
import { Container, ContainerServiceInstanceEnum } from "@src/container";
import { HttpsError } from "@src/application/helpers/exception/https";
import { HttpsResponse } from "@src/application/helpers/https/response";
import { AddUserDTO } from "@src/application/dto/user/add.dto";
import { UserException } from "@src/application/exceptions/user.exception";
import AddUserService from "@src/domain/service/user/add-user";

export default async (req: Request, res: Response) => {
  try {
    const addUserDTO = await getDTOFromRequestAndValidateDTO(req);

    const userService: AddUserService = Container.getServiceInstance(ContainerServiceInstanceEnum.ADD_USER_SERVICE);
    await userService.fromDTO(addUserDTO);

    return HttpsResponse.success(res);
  } catch (error) {
    return HttpsError.fromResponse(res, error);
  }
}

const getDTOFromRequestAndValidateDTO = async (req: Request): Promise<AddUserDTO> => {
  const addUserDTO = AddUserDTO.fromBody(req.body);
  const details = await validate(addUserDTO);
  if (details.length > 0) {
    throw UserException.invalidParameters(details);
  }

  return addUserDTO;
}
