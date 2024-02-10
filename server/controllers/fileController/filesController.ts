import fs from "fs";
import {Request, Response} from "express";
import path from 'path'
import FileUtils from "../../utils/fileUtils";


export interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: Array<{ name: string, type: string, size:number }>
}

class FilesController {
    async getFiles(req: Request, res: Response<ResponseGetFiles>) {
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

    async uploadFile(req: any, res: Response) {
        try {
            const file = req.files.file
            const filenameutf8 = decodeURI(req.body.filename)
            const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)


            if (!resPath) {
                return res.status(400).json({
                    message: 'Error loading file'
                })
            }
            if (fs.existsSync(resPath + filenameutf8)) {
                return res.status(400).json({message: 'A file with the same name already exists'})
            }
            file.mv(resPath + filenameutf8)
            return res.status(200).json({filename: file.name})

        } catch (error: any) {
            return res.status(400).json({message: 'Error loading file'})
        }
    }

    async createFolder(req: Request<{ folderName: string, path: string }>, res: Response) {
        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const newFolder = req.body.folderName;
        console.log(resPath)
        if (!newFolder || !resPath) {
            return res.status(400).json({
                message: 'Error create folder'
            })
        }
        if (fs.existsSync(resPath + newFolder)) {
            return res.status(400).json({message: 'A folder with the same name already exists'})
        }
        try {
            fs.mkdirSync(resPath + newFolder)
            res.status(200).json({folderName: newFolder})
        } catch (e) {
            return res.status(400).json({
                message: 'Error create folder'
            })
        }
    }

    async deleteFile(req: Request<{
        files: { name: string, type: string },
        path: string
    }>, res: Response) {
        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const deleteFiles = req.body.files as { name: string, type: string }[];
        if (!deleteFiles.length || !resPath) {
            return res.status(400).json({
                message: 'Error delete file'
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
                message: 'Error delete file'
            })
        }
    }

    async downloadFile(req: Request<{
        files: { name: string, type: string },
        path: string
    }>, res: Response) {

        const resPath = FileUtils.buildPath(req.headers?.homefolder, req.body.path)
        const downloadFiles = req.body.files as { name: string, type: string }[];
        if (!downloadFiles.length || !resPath) {
            return res.status(400).json({
                message: 'Error loading file'
            })
        }

        try {
            downloadFiles.forEach(file=>{
                if (fs.existsSync(resPath + file.name)) {
                    return res.download(resPath + file.name, file.name)
                }
            })

        } catch (e) {
            return res.status(400).json({message: 'Error loading file'})
        }
    }
}

module.exports = new FilesController()