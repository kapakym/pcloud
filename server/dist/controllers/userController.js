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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
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
            const uuid4Folder = (0, uuid_1.v4)();
            const user = yield User.create({
                email,
                password: hashPassword,
                role: count ? 'user' : 'admin',
                approve: !count,
                homeFolder: uuid4Folder
            });
            const folderName = process.env.CLOUD_PATH + `/${uuid4Folder}`;
            try {
                if (!fs_1.default.existsSync(folderName)) {
                    fs_1.default.mkdirSync(folderName);
                }
            }
            catch (err) {
                console.error(err);
                return next(ApiError.badRequest('Не удалось создать папку для пользователя'));
            }
            // const token = generateJwt(user.id, user.role, user.email)
            return res.json({ message: 'Сформирована заявка на регистрацию' });
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const all = yield User.count();
            console.log(all, email, password);
            if (!password || !email) {
                return next(ApiError.badRequest('Неверное имя пользователя или пароль'));
            }
            const user = yield User.findOne({
                where: { email }
            });
            console.log('*****', user, req.body);
            if (!user) {
                return next(ApiError.badRequest('Неверное имя пользователя или пароль'));
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            console.log(comparePassword);
            if (!comparePassword) {
                return next(ApiError.badRequest('Неверное имя пользователя или пароль'));
            }
            if (!user.approve) {
                return next(ApiError.badRequest('Пользователь не активирован'));
            }
            const token = generateJwt(user.id, user.role, user.email);
            return res.status(200).json({
                token,
                role: user.role,
                folder: user.homeFolder
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
    getUserList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User.findAll();
            const usersMap = users.map((user) => ({
                id: user.dataValues.id,
                email: user.dataValues.email,
                approve: user.dataValues.approve,
                home_folder: user.dataValues.homeFolder
            }));
            res.status(200).json(usersMap);
        });
    }
}
module.exports = new UserController();
