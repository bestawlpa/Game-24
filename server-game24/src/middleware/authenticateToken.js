"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            }
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }
        if (typeof decoded === 'object' && decoded !== null) {
            const userFromToken = {
                id: decoded.id,
                username: decoded.username,
            };
            req.user = userFromToken;
        }
        else {
            return res.status(403).json({ message: "Invalid token format" });
        }
        next();
    });
};
exports.default = authenticateToken;
