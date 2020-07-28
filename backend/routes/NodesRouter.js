const Router = require('koa-router');
const router = new Router();
const NodesController = require('../controllers/NodesController');

router.get('/getNodes', NodesController.getNodes);
router.post('/buyNode', NodesController.buyNode);
router.post('/upgradeNode', NodesController.upgradeNode);
router.post('/autoNode', NodesController.autoNode);
router.post('/executeNode', NodesController.executeNode);

module.exports = router.routes();