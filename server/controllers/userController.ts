import {NextFunction, Request, Response} from "express";
import {RequestToken} from "../middleware/authMiddleware";

const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

interface ResponseRegisterUser {
    token: string
}

interface ResponseLoginUser extends ResponseRegisterUser {
    role: string
}

interface RequestUser {
    email: string;
    password: string;
}

const generateJwt = (id: number, role: string, email: string) => {
    return jwt.sign({
            id,
            role,
            email
        },
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req: Request<RequestUser>, res: Response<ResponseRegisterUser>, next: NextFunction) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Ошибка регистрации'))
        }
        const count = await User.count();
        const candidate = await User.findOne({
            where: {email}
        })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email,
            password: hashPassword,
            role: count ? 'user' : 'admin',
            approve: !count
        })
        const token = generateJwt(user.id, user.role, user.email)
        return res.json({token})
    }

    async login(req: Request<RequestUser>, res: Response<ResponseLoginUser>, next: NextFunction) {
        const {email, password} = req.body
        const user = await User.findOne({
            where: {email}
        })
        // console.log('*****',user, req.body)
        if (!user) {
            return next(ApiError.badRequest('Неверное имя пользователя или пароль'))
        }

        const comparePassword = bcrypt.compareSync(password, user.password)
        console.log(comparePassword)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверное имя пользователя или пароль'))
        }

        if (!user.approve) {
            return next(ApiError.badRequest('Пользователь не активирован'))
        }

        const token = generateJwt(user.id, user.role, user.email);
        return res.json({
            token,
            role: user.role
        })
    }

    async check(req: RequestToken, res: Response<ResponseLoginUser>, next: NextFunction) {
        if (typeof req.user === 'object') {
            const token =generateJwt(req.user.id, req.user.role, req.user.email)
            return res.json({token, role:req.user.role})
        }

    }
}

module.exports = new UserController()