import fs from "fs";
import {NextFunction, Request, Response} from "express";
const ApiError = require('../error/ApiError')

interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: string[]
}

class FilesController {
    async getFiles(req: Request, res: Response<ResponseGetFiles>, next: NextFunction) {


        const currPath = req.body.path.replace('..', '')
        try {
            console.log(process.env.CLOUD_PATH)
            const items = fs.readdirSync(process.env.CLOUD_PATH+currPath, {withFileTypes: true})
            const folders = items.filter((item: any) => item.isDirectory()).map((item: any) => item.name)
            const files = items.filter((item: any) => item.isFile()).map((item: any) => item.name)
            res.status(200).json({
                path: currPath,
                folders, files
            })
        } catch (error: any) {
            res.status(200).json({
                path: '',
                folders: [],
                files: []
            })
            // return next(ApiError.badRequest('Неверный маршрут'))
        }


    }
}

module.exports = new FilesController()