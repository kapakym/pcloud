import {NextFunction, Request, Response} from "express";

const ApiError = require('../error/ApiError')

module.exports = function (err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}