import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { services } from '@src/container';
import { ResponseException } from '@src/helper/response.exception';
import { UserControllerException } from '@src/services/exception/user.controller.exception';
import { UpdateUserDTO } from '@src/application/dto/user/update.dto';

export default async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id ? req.params.id as string : null;
  if (!id) {
    return res.status(400).send({ error: true, message: 'invalid-id' });
  }

  try {
    const updateUserDTO = await validateDTOFromBody(req.body);

    const userUpdatedEntity = await services.user().getUserById(id);
    userUpdatedEntity.updateFromUpdateUserDTO(updateUserDTO);

    const user = await services.user().updateUser(id, userUpdatedEntity);

    return res.status(200).json({ user });
  } catch (error) {
    return ResponseException.fromError(res, error);
  }
};

const validateDTOFromBody = async (body: UpdateUserDTO) => {
  const addUserDTO = UpdateUserDTO.fromBody(body);
  const validateDTO = await validate(addUserDTO);
  if (validateDTO.length > 0) {
    throw UserControllerException.invalidParameters();
  }

  return addUserDTO;
}