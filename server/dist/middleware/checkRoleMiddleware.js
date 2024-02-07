"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
module.exports = function (role) {
    return function (req, res, next) {
        var _a;
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован' });
            }
            if (!process.env.SECRET_KEY) {
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            if (typeof decode === 'object' && !role.includes(decode.role)) {
                return res.status(403).json({ message: 'Нет доступа' });
            }
            req.user = decode;
            console.log('ok');
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Пользователь не авторизован' });
        }
    };
};
