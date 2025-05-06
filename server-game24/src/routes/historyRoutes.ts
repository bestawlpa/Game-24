import experess, { Router } from 'express';
import historyController from '../controllers/historyController';

const router: Router = experess.Router();

router.get('/historys', historyController.getAllHistory);

export default router;