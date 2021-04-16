import { Request, Response } from 'express';
import { services } from '@src/container';
import { ResponseException } from '@src/helper/response.exception';

export default async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id ? req.params.id as string : null;
  if (!id) {
    return res.status(400).send({ error: true, message: 'invalid-id' });
  }

  try {
    const user = await services.user().getUserById(id);

    return res.status(200).json({ user });
  } catch (error) {
    return ResponseException.fromError(res, error);
  }
};