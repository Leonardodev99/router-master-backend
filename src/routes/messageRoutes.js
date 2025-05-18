import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired.js';
import messageController from '../controllers/MessageController.js';

const router = new Router();

router.get('/:username', loginRequired, messageController.index);

export default router;
