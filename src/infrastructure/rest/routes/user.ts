import { Router } from 'express';
import addUser from "@src/application/controller/user/add-user";
import getUsers from "@src/application/controller/user/get-users";
import login from "@src/application/controller/user/login";
import getUser from "@src/application/controller/user/get-user";

const route = Router();

route.get('/', getUsers);
route.get('/:uid', getUser);
route.post('/', addUser);
route.post('/login', login);

export default route;
