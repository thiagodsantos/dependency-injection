import { Response } from "express";
import { ResponseStatusCodeEnum } from "@src/application/helpers/https/response";

export class HttpsError extends Error {
  readonly details?: unknown;
  readonly statusCode: ResponseStatusCodeEnum;

  constructor(statusCode: ResponseStatusCodeEnum, message?: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }

  json() {
    return {
      message: this.message,
      details: this.details
    }
  }

  static fromResponse = (res: Response, error: HttpsError | Error): Response => {
    if (error instanceof HttpsError) {
      return res.status(error.statusCode).json(error.json());
    }

    return res.status(ResponseStatusCodeEnum.INTERNAL).json({ message: error.message });
  }
}
