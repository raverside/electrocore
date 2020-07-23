const Router = require('koa-router');
const router = new Router();
const NodesController = require('../controllers/NodesController');

router.get('/getNodes', NodesController.getNodes);

module.exports = router.routes();