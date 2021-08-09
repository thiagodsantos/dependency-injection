import { Router } from "express";
import user from '@src/infrastructure/rest/routes/user';

const route = Router();

route.use('/user', user);

export default route;
