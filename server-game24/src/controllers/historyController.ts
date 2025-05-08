import historyModel from '../models/historyModel';
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

const createHistory = async (req: Request, res: Response) => {
    try {
        const { userId, numbers, calculate } = req.body;
        const history = await historyService.createHistory(userId,numbers, calculate);
        res.status(201).json({ message: 'History created successfully', history  });
    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error creating history.' });
    }
}

const getHistoryUser = async (req: Request, res: Response) => {
   
    const userId = req.user.id;
    console.log('Received userId:', userId);

    try {
        const history = await historyService.getHistoryUser(userId);
        if (!history) {
            return res.status(404).json({ message: 'no record' });
        }
        res.status(200).json(history);
    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error getHistoryUser.' });
    }
};

export default { getAllHistory, createHistory, getHistoryUser }