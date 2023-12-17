"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJwt = (id, role, email) => {
    return jwt.sign({
        id,
        role,
        email
    }, process.env.SECRET_KEY, { expiresIn: '24h' });
};
class UserController {
    registration(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('Ошибка регистрации'));
            }
            const count = yield User.count();
            const candidate = yield User.findOne({
                where: { email }
            });
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким именем уже существует'));
            }
            const hashPassword = yield bcrypt.hash(password, 5);
            const user = yield User.create({
                email,
                password: hashPassword,
                role: count ? 'user' : 'admin',
                approve: !count
            });
            const token = generateJwt(user.id, user.role, user.email);
            return res.json({ token });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = User.findOne({ where: { email } });
            console.log(user);
            if (!user) {
                return next(ApiError.badRequest('Неверное имя пользователя или пароль'));
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверное имя пользователя или пароль'));
            }
            if (!user.approve) {
                return next(ApiError.badRequest('Пользователь не активирован'));
            }
            const token = generateJwt(user.id, user.role, user.email);
            return res.json({
                token,
                role: user.role
            });
        });
    }
    check(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof req.user === 'object') {
                const token = generateJwt(req.user.id, req.user.role, req.user.email);
                return res.json({ token, role: req.user.role });
            }
        });
    }
}
module.exports = new UserController();
