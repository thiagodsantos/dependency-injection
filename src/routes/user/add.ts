import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { services } from '@src/container';
import { ResponseException } from '@src/helper/response.exception';
import { AddUserDTO } from '@src/application/dto/user/add.dto';
import { UserEntity } from '@src/services/entity/user.entity';
import { UserControllerException } from '@src/services/exception/user.controller.exception';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const addUserDTO = await validateDTOFromBody(req.body);

    const userEntity = UserEntity.fromAddUserDTO(addUserDTO);
    const user = await services.user().addUser(userEntity);

    return res.status(200).json({ user });
  } catch (error) {
    return ResponseException.fromError(res, error);
  }
};

const validateDTOFromBody = async (body: AddUserDTO) => {
  const addUserDTO = AddUserDTO.fromBody(body);
  const validateDTO = await validate(addUserDTO);
  if (validateDTO.length > 0) {
    throw UserControllerException.invalidParameters();
  }

  return addUserDTO;
}