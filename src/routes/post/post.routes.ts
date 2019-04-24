import { Router } from "express";
import POST_CTRL from "../../controllers/post.controller";
import { verifyToken } from "../../middlewares/authentication";

const POST_ROUTES = Router();

POST_ROUTES.get('/posts', POST_CTRL.getPosts);
POST_ROUTES.get('/posts/all', POST_CTRL.getAllPosts);
POST_ROUTES.get('/posts/user', verifyToken, POST_CTRL.getPostsByUser);
POST_ROUTES.get('/posts/likes', verifyToken, POST_CTRL.getTotalLikes);
POST_ROUTES.post('/posts', verifyToken, POST_CTRL.createPost);
POST_ROUTES.delete('/posts/:id', verifyToken, POST_CTRL.deletePost);

export default POST_ROUTES;