import { Router } from "express";
import BAKAT_CTRL from "../../controllers/bakat.controller";
import { verifyToken } from "../../middlewares/authentication";

const BAKAT_ROUTES = Router();

BAKAT_ROUTES.get('/events', BAKAT_CTRL.getPosts);
BAKAT_ROUTES.get('/events/all', BAKAT_CTRL.getAllPosts);
BAKAT_ROUTES.get('/events/user', verifyToken, BAKAT_CTRL.getPostsByUser);
BAKAT_ROUTES.get('/events/likes', verifyToken, BAKAT_CTRL.getTotalLikes);
BAKAT_ROUTES.post('/events', verifyToken, BAKAT_CTRL.createPost);
BAKAT_ROUTES.delete('/events/:id', verifyToken, BAKAT_CTRL.deletePost);

export default BAKAT_ROUTES;