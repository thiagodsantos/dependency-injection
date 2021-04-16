import { Request, Response } from 'express';
import { services } from '@src/container';
import { ResponseException } from '@src/helper/response.exception';

export default async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await services.user().getAll();

    return res.status(200).json({ users });
  } catch (error) {
    return ResponseException.fromError(res, error);
  }
};