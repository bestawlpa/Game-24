import experess, { Router } from 'express';
import userController from '../controllers/userController';

const router: Router = experess.Router();

router.post('/register', userController.createUser);

export default router;