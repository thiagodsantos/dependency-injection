import { Router } from 'express';
import addUser from "@src/application/controller/user/add-user";
import getUsers from "@src/application/controller/user/get-users";
import login from "@src/application/controller/user/login";

const route = Router();

route.get('/', getUsers);
route.post('/', addUser);
route.post('/login', login);

export default route;
