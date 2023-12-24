import fs from "fs";
import {NextFunction, Request, Response} from "express";
import path from 'path'

const ApiError = require('../error/ApiError')

interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: Array<{ name: string, type: string }>
}

class FilesController {
    async getFiles(req: Request, res: Response<ResponseGetFiles>, next: NextFunction) {
        const currPath = req.body.path.replace('.', '')
        const homeFolder = typeof req.headers?.homefolder === 'string' ? req.headers.homefolder.replace('.', '') : '';
        if (!homeFolder || homeFolder === 'error') {
            res.status(200).json({
                path: '',
                folders: [],
                files: []
            })
        }
        const resPath = process.env.CLOUD_PATH + `/${homeFolder}/` + currPath

        try {
            console.log(process.env.CLOUD_PATH)
            const items = fs.readdirSync(resPath, {withFileTypes: true})
            const folders = items.filter((item: any) => item.isDirectory()).map((item: any) => item.name)
            const files = items.filter((item: any) => item.isFile()).map((item: any) => ({
                name: item.name,
                type: path.extname(item.name)
            }))
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