import experess, { Router } from 'express';
import historyController from '../controllers/historyController';

const router: Router = experess.Router();

router.get('/historys', historyController.getAllHistory);
router.post('/add-History', historyController.createHistory);

export default router;