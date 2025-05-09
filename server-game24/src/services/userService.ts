import userModel, { IUser } from "../models/userModel";
import bcrypt from 'bcryptjs';

const createUser = async (userData: IUser) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = new userModel({...userData, password: hashedPassword })
        return await user.save();
    } catch (error) {
        const err = error as Error;
        throw new Error('Error creating user: ' + err.message);
    }
};

const getUserForLogin = async (username: string): Promise<IUser  | null> => {
    try {
        return await userModel.findOne({username});
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching userById: ' + err.message);
    }
};

const getAllUsers = async (): Promise<IUser[]> => {
    try {
        return await userModel.find()
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching users: ' + err.message);
    }
};

const getUserProfile = async (id: string): Promise<IUser  | null> => {
    try {
        return await userModel.findOne({ _id: id })
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching userById: ' + err.message);
    }
};

export { createUser, getUserForLogin, getAllUsers, getUserProfile }