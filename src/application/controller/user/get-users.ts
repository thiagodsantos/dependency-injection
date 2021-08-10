import { Request, Response } from "express";
import { validate } from "class-validator";
import { Container, ContainerServiceInstanceEnum } from "@src/container";
import { HttpsError } from "@src/application/helpers/exception/https";
import { HttpsResponse } from "@src/application/helpers/https/response";
import { UserException } from "@src/application/exceptions/user.exception";
import { GetUsersDTO } from "@src/application/dto/user/get-users.dto";
import GetUsersService from "@src/domain/service/user/get-users";

export default async (req: Request, res: Response) => {
  try {
    const getUsersDTO = await getDTOFromRequestAndValidateDTO(req);

    const usersService: GetUsersService = Container.getServiceInstance(ContainerServiceInstanceEnum.GET_USERS_SERVICE);
    const users = await usersService.getUsersFromDTO(getUsersDTO);

    return HttpsResponse.data(res, users);
  } catch (error) {
    return HttpsError.fromResponse(res, error);
  }
}

const getDTOFromRequestAndValidateDTO = async (req: Request): Promise<GetUsersDTO> => {
  // @ts-ignore
  const getUsersDTO = GetUsersDTO.fromQueryParams(req.query);
  const details = await validate(getUsersDTO);
  if (details.length > 0) {
    throw UserException.invalidParameters(details);
  }

  return getUsersDTO;
}
