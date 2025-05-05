import experess, { Router } from 'express';
import userController from '../controllers/userController';
import authenticateToken from '../middleware/authenticateToken';

const router: Router = experess.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.getUserForLogin);
router.get('/users', userController.getAllUsers);
router.get('/profile', authenticateToken, userController.getUserProfile);

export default router;