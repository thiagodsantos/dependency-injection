import { Response } from "express";

export enum ResponseStatusCodeEnum {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL = 500
}

export class HttpsResponse {
  readonly statusCode: ResponseStatusCodeEnum;
  readonly message: any;

  constructor(statusCode: ResponseStatusCodeEnum, message?: any) {
    this.statusCode = statusCode;
    this.message = message ?? null;
  }

  static success = (res: Response, message?: any): Response => {
    return res.status(ResponseStatusCodeEnum.OK).json({ message });
  }

  static data = (res: Response, data: unknown): Response => {
    return res.status(ResponseStatusCodeEnum.OK).json({ data });
  }
}
