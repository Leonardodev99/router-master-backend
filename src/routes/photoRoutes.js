import { Router } from 'express';
import photoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, photoController.store);
router.put('/', loginRequired, photoController.update);

export default router;
