const Router = require('express');
const router = new Router();
const sharelinkController = require('../controllers/sharelinkController/sharelinkController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/add', authMiddleware, sharelinkController.addSharelink)
router.post('/info', authMiddleware, sharelinkController.getInfoSharelink)

module.exports = router;
export {}