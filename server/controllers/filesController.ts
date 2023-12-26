import fs from "fs";
import {NextFunction, Request, Response} from "express";
import path from 'path'
import FileUtils from "../utils/fileUtils";

const ApiError = require('../error/ApiError')

interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: Array<{ name: string, type: string }>
}

class FilesController {
    async getFiles(req: Request, res: Response<ResponseGetFiles>, next: NextFunction) {
        const currPath = req.body.path.replace('.', '')
        const homeFolder = typeof req.headers?.homefolder === 'string' ? req.headers.homefolder : '';
        const resPath = FileUtils.buildPath(homeFolder, req.body.path)

        if (!resPath) {
            res.status(200).json({
                path: '',
                folders: [],
                files: []
            })
        }

        try {
            console.log(process.env.CLOUD_PATH)
            const items = fs.readdirSync(resPath, {withFileTypes: true})
            const folders = items.filter((item: any) => item.isDirectory()).map((item: any) => item.name)
            const files = items.filter((item: any) => item.isFile()).map((item: any) => ({
                name: item.name,
                type: path.extname(item.name),
                size: fs.statSync(resPath + '/' + item.name).size
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
        }
    }

    async uploadFile(req: any, res: Response, next: NextFunction) {
        try {
            const file = req.files.file
            const homeFolder = typeof req.headers?.homefolder === 'string' ? req.headers.homefolder : '';
            const resPath = FileUtils.buildPath(homeFolder, req.body.path)

            if (!homeFolder || homeFolder === 'error') {
                res.status(400).json({
                    message: 'Ошибка загрузки файла'
                })
            }
            if (fs.existsSync(resPath + file.name)) {
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }

            file.mv(resPath + file.name)
            res.status(200).json({filename: file.name})

        } catch (error: any) {
            res.status(400).json({message: 'Ошибка загрузки файла'})
        }
    }
}

module.exports = new FilesController()