import experess, { Router } from 'express';
import gameController from '../controllers/gameController';

const router: Router = experess.Router();

router.get('/generate-numbers', gameController.generateRandomNumber);

export default router;