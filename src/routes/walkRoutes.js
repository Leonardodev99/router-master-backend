import { Router } from 'express';
import walkController from '../controllers/WalkController';
import loginRequired from '../middlewares/loginRequired'; // Middleware de autenticação

const router = new Router();

router.post('/', loginRequired, walkController.store); // Rota protegida
router.get('/', loginRequired, walkController.index);

export default router;
