import { Router } from "express";
import USER_CTRL from "../../controllers/user.controller";
import { verifyToken } from "../../middlewares/authentication";

const USER_ROUTES = Router();

USER_ROUTES.get('/users', USER_CTRL.getUsers);
USER_ROUTES.get('/user', verifyToken, USER_CTRL.getUserByToken); // Verify
USER_ROUTES.get('/user/:id', USER_CTRL.getUserById); // Storage
USER_ROUTES.post('/user/token', USER_CTRL.refreshToken); // Token
USER_ROUTES.post('/users', USER_CTRL.createUser);
USER_ROUTES.put('/users', verifyToken, USER_CTRL.updateUser);
USER_ROUTES.delete('/users', verifyToken, USER_CTRL.deleteUser);

export default USER_ROUTES;