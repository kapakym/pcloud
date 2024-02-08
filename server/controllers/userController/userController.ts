import {NextFunction, Request, Response} from "express";
import {RequestToken} from "../../middleware/authMiddleware";
import {v4 as uuidv4} from 'uuid';
import fs from "fs";
import {IGetUserListRes, RequestUser, ResponseLoginUser, ResponseRegisterUser} from "./types/types";

const ApiError = require('../../error/ApiError')
const {User} = require('../../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
        const uuid4Folder = uuidv4()
        const user = await User.create({
            email,
            password: hashPassword,
            role: count ? 'user' : 'admin',
            approve: !count,
            homeFolder: uuid4Folder
        })
        const folderName = process.env.CLOUD_PATH + `/${uuid4Folder}`;
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.error(err);
            return next(ApiError.badRequest('Не удалось создать папку для пользователя'))
        }
        // const token = generateJwt(user.id, user.role, user.email)
        return res.json({message: 'Сформирована заявка на регистрацию'})
    }

    async login(req: Request<RequestUser>, res: Response<ResponseLoginUser>, next: NextFunction) {
        const {email, password} = req.body
        const all = await User.count()
        console.log(all, email, password)
        if (!password || !email) {
            return next(ApiError.badRequest('Неверное имя пользователя или пароль'))
        }
        const user = await User.findOne({
            where: {email}
        })
        console.log('*****', user, req.body)
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
        return res.status(200).json({
            token,
            role: user.role,
            folder: user.homeFolder
        })
    }

    async check(req: RequestToken, res: Response<Omit<ResponseLoginUser, 'folder'>>, next: NextFunction) {
        if (typeof req.user === 'object') {
            const token = generateJwt(req.user.id, req.user.role, req.user.email)
            return res.json({token, role: req.user.role})
        }

    }

    async getUserList(req: Request<unknown>, res: Response<IGetUserListRes[]>) {
        const users = await User.findAll()
        const usersMap: IGetUserListRes[] = users.map((user: typeof User) => ({
            id: user.dataValues.id,
            email: user.dataValues.email,
            approve: user.dataValues.approve,
            home_folder: user.dataValues.homeFolder
        }));
        res.status(200).json(usersMap)
    }

    async setApprove(req: Request<any>, res: Response<any>) {
        const {id, approve} = req.body
        console.log(approve)
        if (String(id)) {
            try {
                const user = await User.findOne({where: {id}})
                if (user) {
                    if (user.role === 'admin') {
                        return res.status(400).json({message: 'Данного пользователя нельзя деактивировать'})
                    }
                    await user.update({approve})
                    return res.status(200).json({message: "OK"})
                }
                res.status(400).json({message: 'Ошибка'})
            } catch (e) {
                console.log(e)
                res.status(400).json({message: 'Ошибка'})
            }
        }
    }
}

module.exports = new UserController()