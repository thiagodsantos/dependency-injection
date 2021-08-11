import { Request, Response } from "express";
import { classToPlain } from "class-transformer";
import { isAuthenticatedFromRequest } from "@src/application/authentication/token";
import { HttpsError } from "@src/application/helpers/exception/https";
import { HttpsResponse } from "@src/application/helpers/https/response";
import { Container, ContainerServiceInstanceEnum } from "@src/container";
import { UserException } from "@src/application/exceptions/user.exception";
import { cache, CachePrefixEnum } from "@src/infrastructure/cache/memory";
import GetUserService from "@src/domain/service/user/get-user";

export default async (req: Request, res: Response) => {
  const uid: string = req.params.uid;
  if (!uid) {
    return HttpsError.fromResponse(res, UserException.invalidParameters('EMPTY_UID'));
  }

  const cacheUserKey = CachePrefixEnum.USERS + uid;

  try {
    isAuthenticatedFromRequest(req);

    const userCached = cache.get(cacheUserKey);
    if (userCached) {
      return HttpsResponse.data(res, userCached);
    }

    const userService: GetUserService = Container.getServiceInstance(ContainerServiceInstanceEnum.GET_USER_SERVICE);
    const user = await userService.getUserByUID(uid);

    if (user) {
      cache.set(cacheUserKey, classToPlain(user));
    }

    return HttpsResponse.data(res, user);
  } catch (error) {
    return HttpsError.fromResponse(res, error);
  }
}
