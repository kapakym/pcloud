import fs from "fs";
import {NextFunction, Request, Response} from "express";
import FileUtils from "../../utils/fileUtils";
import {IShareLink, ShareLink} from "../../models/models"
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt'
import {
    IGetShareReq,
    IGetShareRes,
    IShareInfoReq,
    IShareInfoRes,
    ISharelinkAddReq,
    IShareLinkAddRes
} from "./types/types";

const ApiError = require('../../error/ApiError')
import jwt from "jsonwebtoken";
import path from "path";


class SharelinkController {
    async addSharelink(req: Request<ISharelinkAddReq>, res: Response<IShareLinkAddRes>) {
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
            await findFile.update(<IShareLink>{
                path: resPath,
                type,
                pincode: pincode ? await bcrypt.hash(pincode, 5) : "",
                timelive: date_to ? date_to : undefined,
                uuid: uuid,
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
            uuid: uuid,
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

    async getInfoSharelink(req: Request<IShareInfoReq>, res: Response<IShareInfoRes>, next: NextFunction) {
        const {
            uuid
        } = req.body as IShareInfoReq

        const findLink = await ShareLink.findOne({uuid})

        if (findLink) {
            res.status(200).json({
                name: findLink.name,
                type: findLink.type,
                date_to: findLink.date_to,
                path: findLink.path,
                is_pincode: !!findLink.pincode

            })
            return;
        }
        return next(ApiError.badRequest('Ссылка не найдена'))
    }

    async getShare(req: Request<IGetShareReq>, res: Response<IGetShareRes>, next: NextFunction) {
        const {
            uuid,
            token,
            pincode,
        } = req.body as IGetShareReq

        const findLink = await ShareLink.findOne({where: {uuid}})
        let currentToken = token
        if (!findLink) {
            return next(ApiError.errorRequest('Ссылка не найдена'));
        }

        if (findLink) {

            if (findLink.timelive && new Date() > findLink.timelive) {
                return next(ApiError.errorRequest('Ссылка больше недоступна'));
            }

            if (pincode) {
                if (!bcrypt.compareSync(pincode, findLink.pincode)) {
                    res.status(400).json({
                        message: 'Неверный пинкод',
                        detail: 'BAD_PINCODE'
                    })
                    return
                }
                currentToken = jwt.sign({
                        name: findLink.name,
                        type: findLink.type,
                    },
                    findLink.pincode,
                    {expiresIn: '24h'}
                )
            }

            if (findLink.pincode && !currentToken) {
                res.status(400).json({
                    message: 'Требуется пинкод',
                    detail: 'NEED_PINCODE'
                })
                return
            }


            if (currentToken) {
                try {
                    jwt.verify(currentToken, findLink.pincode)
                } catch (e) {
                    return next(ApiError.badRequest('Ресурс не доступен'))
                }
            }


            if (findLink.type === 'FILE') {
                return res.status(200).json({
                    path: '',
                    folders: [],
                    files: [
                        {name: findLink.name, type: '', size: 1200}
                    ],
                    token: token ? undefined : currentToken
                })
            }

            const currPath = req.body?.path ? req.body?.path.replace('.', '') : ''
            const resPath = findLink.path + findLink.name + currPath
            try {

                const items = fs.readdirSync(resPath, {withFileTypes: true})
                const folders = items.filter((item: any) => item.isDirectory()).map((item: any) => item.name)
                const files = items.filter((item: any) => item.isFile()).map((item: any) => ({
                    name: item.name,
                    type: path.extname(item.name),
                    size: fs.statSync(resPath + '/' + item.name).size
                }))
                return res.status(200).json({
                    path: currPath,
                    folders,
                    files,
                    token: token ? undefined : currentToken
                })
            } catch (error: any) {
                console.log(error)
                return res.status(200).json({
                    path: '',
                    folders: [],
                    files: []
                })
            }

        }

        return next(ApiError.badRequest('Ссылка не найдена'))

    }

    async downloadFile(req: Request<{
        file: { name: string, type: string },
        uuid: string,
        path: string,
        token: string
    }>, res: Response, next: NextFunction) {

        const findLink = await ShareLink.findOne({where: {uuid: req.body.uuid}})

        try {
            if (findLink.type==="FILE") {
                if (fs.existsSync(findLink.path + findLink.name)) {
                    return res.download(findLink.path + findLink.name, findLink.name)
                }
            }
        } catch (e) {
            return res.status(400).json({message: 'Ошибка загрузки файла'})
        }


        const currPath = req.body?.path ? req.body?.path.replace('.', '') : ''
        const resPath = findLink.path + findLink.name + currPath + '/'
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
            console.log(e)
            return res.status(400).json({message: 'Ошибка загрузки файла'})
        }
    }
}

module.exports = new SharelinkController()