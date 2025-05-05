import  * as userService from '../services/userService';
import { Request, Response } from 'express';
import  userModel  from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

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

const getUserForLogin = async (req:Request ,res:Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'username and password are required' });
        }

        const user = await userService.getUserForLogin(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        const token  = jwt.sign(
            {
                id: user._id,
                username: user.username,
            }, SECRET_KEY,
            { 
                expiresIn: '24h' 
            }
        )

        res.cookie('jwtToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login Success",
            token,
            user: {
                id: user._id,
                username: user.username,
            }
        })

    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error fetch user.' });
    }
};

const getAllUsers = async (req:Request, res:Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

const getUserProfile = async (req:Request, res:Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const userId = req.user.id;
        const user = await userService.getUserProfile(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = {
            _id: user._id,
            username: user.username,
        };

        res.status(200).json(result);
    } catch (error) {
        const err = error as Error;  
        res.status(500).json({ message: err.message || 'Error fetch user.' });
    }
};

export default { createUser, getUserForLogin, getAllUsers, getUserProfile  };