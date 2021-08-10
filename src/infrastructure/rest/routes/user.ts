import { Router } from 'express';
import addUser from "@src/application/controller/user/add-user";
import getUsers from "@src/application/controller/user/get-users";

const route = Router();

route.get('/', getUsers);
route.post('/', addUser);

export default route;
