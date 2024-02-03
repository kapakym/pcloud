import {NextFunction, Request, Response} from "express";
import {JwtPayload} from "jsonwebtoken";
import {ShareLink} from "../models/models";

const jwt = require('jsonwebtoken')

export interface RequestToken extends Request {
    user: JwtPayload | string
}

module.exports = async function (req: RequestToken, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.body.token
        console.log(req.body)
        if (!token || !req.body.uuid) {
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }

        const findLink = await ShareLink.findOne({where: {uuid: req.body.uuid}})
        jwt.verify(token, findLink.pincode)

        next()
    } catch (error) {
        return res.status(401).json({message: 'Пользователь не авторизован'})
    }

}