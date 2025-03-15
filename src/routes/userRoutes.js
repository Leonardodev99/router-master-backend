import { Router } from "express";
import userController from '../controllers/UserController';

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post('/', userController.store);
router.get('/:userId', loginRequired, userController.userprofile);
router.put('/:userId', loginRequired, userController.update);
router.delete('/:id', userController.delete);

export default router;
