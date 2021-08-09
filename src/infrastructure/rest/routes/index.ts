import { Router } from "express";
import user from '@src/infrastructure/rest/routes/user';

type RouteType = {
  path: string,
  router: Router
}

const routes: RouteType[] = [
  {
    path: "/user",
    router: user
  }
]

const router = Router();
for (const route of routes) {
  router.use('/' + process.env.API_VERSION + route.path, route.router);
}

export default router;
