import  * as userService from '../services/userService';
import { Request, Response } from 'express';
import  userModel from '../models/userModel';

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }

        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one uppercase letter.'
            });
        }

        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                message: 'Password must contain at least one number.'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long.'
            });
        }

        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username is already in use. Please choose another one.' });
        }

        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: 'User created successfully!',
            data: user
        }); 

    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error creating user.' });
    }
};

export default { createUser };