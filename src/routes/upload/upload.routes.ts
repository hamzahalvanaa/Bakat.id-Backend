import { Router } from "express";
import UPLOAD_CTRL from "../../controllers/upload.controller";

const UPLOAD_ROUTES = Router();

UPLOAD_ROUTES.get('/sign-s3', UPLOAD_CTRL.uploadS3);

export default UPLOAD_ROUTES;