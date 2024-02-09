const Router = require('express');
const router = new Router();
const sharelinkController = require('../controllers/sharelinkController/sharelinkController')
const authMiddleware = require('../middleware/authMiddleware')
const authShareMiddleware = require('../middleware/authShareMiddleware')


router.post('/add', authMiddleware, sharelinkController.addSharelink)
router.post('/info', authMiddleware, sharelinkController.getInfoSharelink)
router.post('/share', sharelinkController.getShare)
router.post('/downloadfile', authShareMiddleware, sharelinkController.downloadFile)
router.get('/sharedlinkslist', authMiddleware, sharelinkController.getSharedLinks)
module.exports = router;
export {}