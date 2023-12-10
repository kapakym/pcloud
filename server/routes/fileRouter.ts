const Router = require('express');
const router = new Router();
const filesController = require('../controllers/filesController')
router.post('/', filesController.getFiles)
module.exports = router;
export {}