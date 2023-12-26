const Router = require('express');
const router = new Router();
const filesController = require('../controllers/filesController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, filesController.getFiles)
router.post('/upload', authMiddleware, filesController.uploadFile)
module.exports = router;
export {}