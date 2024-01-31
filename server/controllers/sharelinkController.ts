import fs from "fs";
import {NextFunction, Request, Response} from "express";
import FileUtils from "../utils/fileUtils";
import {IShareLink, ShareLink} from "../models/models"
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt'

const ApiError = require('../error/ApiError')

export interface ISharelinkAddReq {
    path: string;
    type: string;
    name: string;
    pincode?: string,
    date_to?: string
}

export interface IShareLinkAddRes {
    message: string
    uuid: string
    name: string
}

class SharelinkController {
    async addSharelink(req: Request<ISharelinkAddReq>, res: Response<IShareLinkAddRes>, next: NextFunction) {
        const {
            type,
            pincode,
            date_to,
            name
        } = req.body as ISharelinkAddReq

        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const findFile = await ShareLink.findOne({where: {name}})
        const uuid = uuidv4();
        if (findFile) {
            const shareLink = await findFile.update(<IShareLink>{
                path: resPath,
                type,
                pincode: pincode ? await bcrypt.hash(pincode, 5) : "",
                timelive: date_to ? date_to : undefined,
                uuid: uuidv4(),
                name
            })

            res.status(200).json({
                message: "Ссылка обновлена",
                uuid,
                name: name
            })
            return;
        }

        const shareLink = await ShareLink.create({
            path: resPath,
            type,
            pincode: pincode ? await bcrypt.hash(pincode, 5) : "",
            timelive: date_to ? date_to : undefined,
            uuid: uuidv4(),
            name
        } as IShareLink)

        if (shareLink) {
            res.status(200).json({
                message: "Ссылка создана",
                uuid,
                name: resPath
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
        console.log(resPath)
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

    async deleteFile(req: Request<{
        files: { name: string, type: string },
        path: string
    }>, res: Response, next: NextFunction) {
        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const deleteFiles = req.body.files as { name: string, type: string }[];
        if (!deleteFiles.length || !resPath) {
            return res.status(400).json({
                message: 'Ошибка удаления файла'
            })
        }
        try {
            deleteFiles.forEach(file => {
                console.log(resPath, file)
                if (file.type === 'FILE') {
                    fs.rmSync(resPath + file.name)

                }
                if (file.type === 'DIR') {
                    fs.rmdirSync(resPath + file.name, {recursive: true})
                }

            })
            res.status(200).json({deleteFiles})
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: 'Ошибка удаления файла'
            })
        }
    }

    async downloadFile(req: Request<{
        files: { name: string, type: string },
        path: string
    }>, res: Response, next: NextFunction) {

        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const downloadFiles = req.body.files as { name: string, type: string }[];
        if (!downloadFiles.length || !resPath) {
            return res.status(400).json({
                message: 'Ошибка загрузки файла'
            })
        }

        try {
            downloadFiles.forEach(file => {
                if (fs.existsSync(resPath + file.name)) {
                    return res.download(resPath + file.name, file.name)
                }
            })

        } catch (e) {
            return res.status(400).json({message: 'Ошибка загрузки файла'})
        }
    }
}

module.exports = new SharelinkController()