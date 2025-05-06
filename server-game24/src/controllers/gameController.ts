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
};

const checkAnswer = (req: Request, res: Response) => {
  const { numbers, calculate, userId } = req.body;
  console.log(userId, calculate, numbers);
  
  try {
    const isCorrect = gameService.checkAnswer(userId, numbers, calculate);
    res.status(200).json({ correct: isCorrect });
  } catch (error) {
    res.status(400).json({ message: 'Invalid expression' });
  }
};

export default { generateRandomNumber, checkAnswer }