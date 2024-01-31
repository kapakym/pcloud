const Router = require('express');
const router = new Router();
const sharelinkController = require('../controllers/sharelinkController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/add', authMiddleware, sharelinkController.addSharelink)

module.exports = router;
export {}