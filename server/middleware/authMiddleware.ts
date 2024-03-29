import {NextFunction, Request, Response} from "express";
import {JwtPayload} from "jsonwebtoken";

const jwt = require('jsonwebtoken')

export interface RequestToken extends Request {
    user: {
        id: number,
        role: string,
        email: string
    }
}

module.exports = function (req: RequestToken, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decode;
        next()
    } catch (error) {
        return res.status(401).json({message: 'Пользователь не авторизован'})
    }

}