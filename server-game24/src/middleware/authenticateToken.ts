import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY as string;
import { IUser } from '../models/userModel';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwtToken;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, SECRET_KEY, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }

        if (typeof decoded === 'object' && decoded !== null) {
            const userFromToken: Partial<IUser> = {
                id: decoded.id as string,  
                username: decoded.username as string,
            };
            req.user = userFromToken as IUser; 
        } else {
            return res.status(403).json({ message: "Invalid token format" });
        }

        next();
    });
};
export default authenticateToken;
