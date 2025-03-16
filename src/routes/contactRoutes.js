import { Router } from 'express';
import contactController from '../controllers/ContactController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, contactController.store); // Adicionar contato
router.get('/', loginRequired, contactController.index);  // Listar contatos

export default router;
