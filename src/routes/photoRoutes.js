import { Router } from "express";

import PhotoController from '../controllers/PhotoController';

const router = new Router();

router.post('/', PhotoController.Store)

export default router;
