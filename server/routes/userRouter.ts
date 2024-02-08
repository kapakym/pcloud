const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/getusers', checkRoleMiddleware(['admin']), userController.getUserList)
router.post('/approve', checkRoleMiddleware(['admin']), userController.setApprove)

module.exports = router;
export {}