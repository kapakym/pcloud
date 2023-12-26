"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileUtils_1 = __importDefault(require("../utils/fileUtils"));
const ApiError = require('../error/ApiError');
class FilesController {
    getFiles(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const currPath = req.body.path.replace('.', '');
            const homeFolder = typeof ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.homefolder) === 'string' ? req.headers.homefolder : '';
            const resPath = fileUtils_1.default.buildPath(homeFolder, req.body.path);
            if (!resPath) {
                res.status(200).json({
                    path: '',
                    folders: [],
                    files: []
                });
            }
            try {
                console.log(process.env.CLOUD_PATH);
                const items = fs_1.default.readdirSync(resPath, { withFileTypes: true });
                const folders = items.filter((item) => item.isDirectory()).map((item) => item.name);
                const files = items.filter((item) => item.isFile()).map((item) => ({
                    name: item.name,
                    type: path_1.default.extname(item.name),
                    size: fs_1.default.statSync(resPath + '/' + item.name).size
                }));
                res.status(200).json({
                    path: currPath,
                    folders, files
                });
            }
            catch (error) {
                res.status(200).json({
                    path: '',
                    folders: [],
                    files: []
                });
            }
        });
    }
    uploadFile(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.files.file;
                const homeFolder = typeof ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.homefolder) === 'string' ? req.headers.homefolder : '';
                const resPath = fileUtils_1.default.buildPath(homeFolder, req.body.path);
                if (!homeFolder || homeFolder === 'error') {
                    res.status(400).json({
                        message: 'Ошибка загрузки файла'
                    });
                }
                if (fs_1.default.existsSync(resPath + file.name)) {
                    return res.status(400).json({ message: 'Файл с таким именем уже существует' });
                }
                file.mv(resPath + file.name);
                res.status(200).json({ filename: file.name });
            }
            catch (error) {
                res.status(400).json({ message: 'Ошибка загрузки файла' });
            }
        });
    }
}
module.exports = new FilesController();
