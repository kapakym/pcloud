const Router = require('express');
const router = new Router();
const filesRouter = require('./fileRouter')
const userRouter = require('./userRouter')
const shareLinkRouter = require('./sharelinkRouter')

router.use('/files', filesRouter)
router.use('/user', userRouter)
router.use('/sharelink', shareLinkRouter)

module.exports = router;
export {}