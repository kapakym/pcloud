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
        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)

        if (!resPath) {
            return res.status(200).json({
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
            return res.status(200).json({
                path: currPath,
                folders, files
            })
        } catch (error: any) {
            return res.status(200).json({
                path: '',
                folders: [],
                files: []
            })
        }
    }

    async uploadFile(req: any, res: Response, next: NextFunction) {
        try {
            const file = req.files.file
            const filenameutf8 = decodeURI(req.body.filename)
            const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)


            if (!resPath) {
                return res.status(400).json({
                    message: 'Ошибка загрузки файла'
                })
            }
            if (fs.existsSync(resPath + filenameutf8)) {
                return res.status(400).json({message: 'Файл с таким именем уже существует'})
            }
            file.mv(resPath + filenameutf8)
            return res.status(200).json({filename: file.name})

        } catch (error: any) {
            return res.status(400).json({message: 'Ошибка загрузки файла'})
        }
    }

    async createFolder(req: Request<{ folderName: string, path: string }>, res: Response, next: NextFunction) {
        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const newFolder = req.body.folderName;

        if (!newFolder || !resPath) {
            return res.status(400).json({
                message: 'Ошибка создания папки'
            })
        }
        if (fs.existsSync(resPath + newFolder)) {
            return res.status(400).json({message: 'Папка с таким именем уже существует'})
        }
        try {
            fs.mkdirSync(resPath + newFolder)
            res.status(200).json({folderName: newFolder})
        } catch (e) {
            return res.status(400).json({
                message: 'Ошибка создания папки'
            })
        }
    }

    async deleteFile(req: Request<{ files: string[], path: string }>, res: Response, next: NextFunction) {
        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const deleteFiles = req.body.files as string[];

        if (!deleteFiles.length || !resPath) {
            return res.status(400).json({
                message: 'Ошибка удаления файла'
            })
        }
        try {
            deleteFiles.forEach(file=>{
                fs.rmSync(resPath + file)
            })
            res.status(200).json({deleteFiles})
        } catch (e) {
            return res.status(400).json({
                message: 'Ошибка удаления файла'
            })
        }
    }

    async downloadFile(req: Request<{ fileName: string }>, res: Response, next: NextFunction) {

        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const downloadFile = req.body.fileName;
        if (!downloadFile || !resPath) {
            return res.status(400).json({
                message: 'Ошибка загрузки файла'
            })
        }

        try {
            if (fs.existsSync(resPath + downloadFile)) {
                return res.download(resPath + downloadFile, downloadFile)
            }
        } catch (e) {
            return res.status(400).json({message: 'Ошибка загрузки файла'})
        }
    }
}

module.exports = new FilesController()