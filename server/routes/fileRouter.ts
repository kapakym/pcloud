const Router = require('express');
const router = new Router();
const filesController = require('../controllers/fileController/filesController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, filesController.getFiles)
router.post('/upload', authMiddleware, filesController.uploadFile)
router.post('/createfolder', authMiddleware, filesController.createFolder)
router.post('/deletefile', authMiddleware, filesController.deleteFile)
router.post('/downloadfile', authMiddleware, filesController.downloadFile)

module.exports = router;
export {}