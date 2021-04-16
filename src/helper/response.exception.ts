import { Response } from 'express';

export class ResponseException {
  static fromError = (res: Response, error: Error) => {
    return error.message
      ? res.status(400).json({ error: true, message: error.message })
      : res.status(500).json({ error: true, message: 'internal' });
  }
}