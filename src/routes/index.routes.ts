import Router from "express";

import USER_ROUTES from './user/user.routes';
import LOGIN_ROUTES from "./login/login.routes";
import POST_ROUTES from "./post/post.routes";
import BAKAT_ROUTES from "./bakat/bakat.routes";
import UPLOAD_ROUTES from "./upload/upload.routes";
import FAVORITE_ROUTES from "./favorites/favorites.routes";
import LIKES_ROUTES from "./likes/likes.routes";

const ROUTES = Router();

ROUTES.use('/', [LOGIN_ROUTES,
                 USER_ROUTES,
                 POST_ROUTES,
                 BAKAT_ROUTES,
                 UPLOAD_ROUTES,
                 FAVORITE_ROUTES,
                 LIKES_ROUTES]);

export default ROUTES;




