import fs from "fs";
import {NextFunction, Request, Response} from "express";
import FileUtils from "../../utils/fileUtils";
import {IShareLink, ShareLink} from "../../models/models"
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt'
import {IShareInfoReq, IShareInfoRes, ISharelinkAddReq, IShareLinkAddRes} from "./types/types";

const ApiError = require('../../error/ApiError')
import jwt from "jsonwebtoken";


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

    async getShare(req: Request<any>, res: Response<any>, next: NextFunction) {
        const {
            uuid,
            token,
            pincode,
            patch
        } = req.body

        const findLink = await ShareLink.findOne({where: {uuid}})
        let currentToken = token
        if (!findLink) {
            return next(ApiError.errorRequest('Ссылка не найдена'));
        }

        console.log(findLink)
        if (findLink) {

            if (findLink.date_to && new Date() > findLink.date_to) {
                return next(ApiError.errorRequest('Ссылка не найдена'));
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



            if (findLink.pincode) {
                try {
                    const decode = jwt.verify(currentToken, findLink.pincode)
                } catch (e) {
                    return next(ApiError.badRequest('Ресурс не доступен'))
                }
            }


            if (findLink.type === 'FILE') {
                return res.status(200).json({
                    path: findLink.path,
                    folders: [],
                    files: [
                        { name: findLink.name, type: '', size: 1200 }
                        ],
                    token: token ? undefined : currentToken
                })
            }

            // try {
            //     console.log(process.env.CLOUD_PATH)
            //     const items = fs.readdirSync(resPath, {withFileTypes: true})
            //     const folders = items.filter((item: any) => item.isDirectory()).map((item: any) => item.name)
            //     const files = items.filter((item: any) => item.isFile()).map((item: any) => ({
            //         name: item.name,
            //         type: path.extname(item.name),
            //         size: fs.statSync(resPath + '/' + item.name).size
            //     }))
            //     return res.status(200).json({
            //         path: currPath,
            //         folders, files
            //     })
            // } catch (error: any) {
            //     return res.status(200).json({
            //         path: '',
            //         folders: [],
            //         files: []
            //     })
            // }

        }

        return next(ApiError.badRequest('Ссылка не найдена'))

    }
}

module.exports = new SharelinkController()