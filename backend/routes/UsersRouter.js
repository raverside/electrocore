const Router = require('koa-router');
const router = new Router();
const UsersController = require('../controllers/UsersController');

router.get('/getUser', UsersController.getUser);

module.exports = router.routes();