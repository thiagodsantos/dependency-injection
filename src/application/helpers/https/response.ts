import { Response } from "express";

export enum ResponseStatusCodeEnum {
  OK = 200,
  BAD_REQUEST = 400,
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
}
