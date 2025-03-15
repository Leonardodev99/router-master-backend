import { Router } from "express";
import multer from "multer";
import PhotoController from '../controllers/PhotoController';
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig);

const router = new Router();

router.post('/', upload.single('photo'), PhotoController.Store)

export default router;
