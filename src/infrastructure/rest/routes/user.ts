import { Router } from 'express';
import addUser from "@src/application/controller/user/add-user";

const route = Router();

route.post('/', addUser);

export default route;
