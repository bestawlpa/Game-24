import experess, { Router } from 'express';
import historyController from '../controllers/historyController';
import authenticateToken from '../middleware/authenticateToken';

const router: Router = experess.Router();

router.get('/historys', historyController.getAllHistory);
router.post('/add-History', historyController.createHistory);
router.get('/history/:userId', authenticateToken, historyController.getHistoryUser);

export default router;