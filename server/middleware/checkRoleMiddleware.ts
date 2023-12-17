import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import {RequestToken} from "./authMiddleware";

module.exports = function (role: string[]) {
    return function (req: RequestToken, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: 'Пользователь не авторизован'})
            }
            if (!process.env.SECRET_KEY) {
                return res.status(500).json({message: 'Ошибка сервера'})
            }
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            if (typeof decode === 'object' && !role.includes(decode.role)) {
                return res.status(403).json({message: 'Нет доступа'})
            }
            req.user = decode;
            next()
        } catch (error) {
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }


}