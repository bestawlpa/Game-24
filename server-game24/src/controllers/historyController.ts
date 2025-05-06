import * as historyService from '../services/historyService';
import { Request, Response } from 'express';

const getAllHistory= async (req:Request, res:Response) => {
    try {
        const history = await historyService.getAllHistory();
        res.status(200).json(history);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

export default { getAllHistory }