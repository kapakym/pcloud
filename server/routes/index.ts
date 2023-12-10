const Router = require('express');
const router = new Router();
const filesRouter = require('./fileRouter')

router.use('/files', filesRouter)

module.exports = router;
export {}