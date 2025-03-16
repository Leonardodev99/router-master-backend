import { Router } from 'express';
import GeneralizedPasswordRecoveryController from '../controllers/GeneralizedPasswordRecoveryController';

const router = new Router();

// Solicitar redefinição de senha
router.post('/request-reset', GeneralizedPasswordRecoveryController.requestReset);

// Redefinir a senha
router.post('/reset-password', GeneralizedPasswordRecoveryController.resetPassword);

export default router;

