import fs from "fs";
import {Request, Response} from "express";

interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: string[]
}

class FilesController {
    async getFiles(req: Request, res: Response<ResponseGetFiles>) {


        const currPath = req.body.path.replace('..', '')
        try {
            const items = fs.readdirSync(currPath, {withFileTypes: true})
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
        }


    }
}

module.exports = new FilesController()