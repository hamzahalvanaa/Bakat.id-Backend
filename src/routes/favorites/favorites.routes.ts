import { Router } from "express";
import FAVORITE_CTRL from "../../controllers/favorites.controller";
import { verifyToken } from "../../middlewares/authentication";

const FAVORITE_ROUTES = Router();

FAVORITE_ROUTES.get('/favorites', verifyToken, FAVORITE_CTRL.getFavoritesByUser);
FAVORITE_ROUTES.post('/favorites', verifyToken, FAVORITE_CTRL.addFavorite);
FAVORITE_ROUTES.delete('/favorites', verifyToken, FAVORITE_CTRL.removeFavorite);

export default FAVORITE_ROUTES;