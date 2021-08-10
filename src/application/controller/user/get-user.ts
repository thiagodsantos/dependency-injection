import { Request, Response } from "express";
import { isAuthenticatedFromRequest } from "@src/application/authentication/token";
import { HttpsError } from "@src/application/helpers/exception/https";
import { HttpsResponse } from "@src/application/helpers/https/response";
import { Container, ContainerServiceInstanceEnum } from "@src/container";
import GetUserService from "@src/domain/service/user/get-user";

export default async (req: Request, res: Response) => {
  try {
    isAuthenticatedFromRequest(req);

    const uid: string = req.params.uid;

    const userService: GetUserService = Container.getServiceInstance(ContainerServiceInstanceEnum.GET_USER_SERVICE);
    const user = await userService.getUserByUID(uid);

    return HttpsResponse.data(res, user);
  } catch (error) {
    return HttpsError.fromResponse(res, error);
  }
}
