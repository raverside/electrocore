const NodeService = require('../services/NodeService');

class NodesController {

    static async getNodes(ctx) {
        const nodes = await NodeService.createNodes();

        ctx.body = nodes;
    }

}

module.exports = NodesController;