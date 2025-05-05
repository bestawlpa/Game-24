import * as gameService from '../services/gameService';
import { Request, Response } from 'express';

const generateRandomNumber = async (req: Request, res: Response) => {
    try {
        const number = gameService.generateRandomNumber();
        res.status(200).json({ number });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}

export default { generateRandomNumber }