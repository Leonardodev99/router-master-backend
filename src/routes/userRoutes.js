import { Router } from "express";
import userController from '../controllers/UserController';
import multer from 'multer';
import multerConfig from '../config/multerConfig';


import loginRequired from "../middlewares/loginRequired";

const upload = multer(multerConfig);



const router = new Router();

router.post('/', userController.store);
router.get('/profile', loginRequired, userController.userprofile);
router.put('/:userId', loginRequired, upload.single('photo'), userController.update);
router.delete('/:id', userController.delete);

export default router;
