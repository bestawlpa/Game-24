import experess, { Router } from 'express';
import userController from '../controllers/userController';

const router: Router = experess.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.getUserForLogin);
router.get('/users', userController.getAllUsers);

export default router;