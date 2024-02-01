"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    var _a;
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        req.user = decode;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
};
