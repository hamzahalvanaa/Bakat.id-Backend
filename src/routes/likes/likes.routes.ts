import { Router } from "express";
import LIKES_CTRL from "../../controllers/likes.controller";
import { verifyToken } from "../../middlewares/authentication";

const LIKES_ROUTES = Router();

LIKES_ROUTES.post('/likes', verifyToken, LIKES_CTRL.like);

export default LIKES_ROUTES;