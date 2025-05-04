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

export { createUser }