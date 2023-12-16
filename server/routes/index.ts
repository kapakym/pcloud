const Router = require('express');
const router = new Router();
const filesRouter = require('./fileRouter')
const userRouter = require('./userRouter')

router.use('/files', filesRouter)
router.use('/user', userRouter)

module.exports = router;
export {}