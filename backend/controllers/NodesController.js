const NodeService = require('../services/NodeService');
const UserService = require('../services/UserService');

class NodesController {

    /**
     * Get user-specific list of Nodes (create them if necessary)
     *
     * @param ctx
     * @returns {Promise<Array>}
     */
    static async getNodes(ctx) {
        const userId = ctx.decode.id;

        const user = await UserService.getUserById(userId);
        const nodes = await NodeService.createNodes(user);

        ctx.body = nodes;
    }

    /**
     * Unlock the Node if the User has enough currency
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async buyNode(ctx) {
        const userId = ctx.decode.id;
        const nodeId = ctx.request.body.id;

        const user = await UserService.getUserById(userId);
        const nodeCost = await NodeService.getInitialCost(nodeId, user);

        if (!user.hasEnoughCurrency(nodeCost)) {
            ctx.throw(422, {error: 'Not enough currency'});
        } else {
            const node = await NodeService.unlockNode(nodeId, user);
            const updatedCurrency = await UserService.changeCurrency(-nodeCost, user);

            ctx.body = node;
        }
    }

    /**
     * Upgrade the Node if the User has enough currency
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async upgradeNode(ctx) {
        const userId = ctx.decode.id;
        const nodeId = ctx.request.body.id;

        const user = await UserService.getUserById(userId);
        const nodeCost = await NodeService.getTotalUpgradeCost(nodeId, user);

        if (!user.hasEnoughCurrency(nodeCost)) {
            ctx.throw(422, {error: 'Not enough currency'});
        } else {
            const node = await NodeService.upgradeNode(nodeId, user);
            const updatedCurrency = await UserService.changeCurrency(-nodeCost, user);

            ctx.body = node;
        }
    }

    /**
     * Set the Node to auto mode if the User has enough currency
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async autoNode(ctx) {
        const userId = ctx.decode.id;
        const nodeId = ctx.request.body.id;

        const user = await UserService.getUserById(userId);
        const nodeCost = await NodeService.getAutoCost(nodeId, user);

        if (!user.hasEnoughCurrency(nodeCost)) {
            ctx.throw(422, {error: 'Not enough currency'});
        } else {
            const node = await NodeService.autoNode(nodeId, user);
            const updatedCurrency = await UserService.changeCurrency(-nodeCost, user);

            ctx.body = node;
        }
    }

    /**
     * Execute the Node and pay the User (eventually)
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async executeNode(ctx) {
        const userId = ctx.decode.id;
        const nodeId = ctx.request.body.id;

        const user = await UserService.getUserById(userId);
        const node = await NodeService.executeNode(nodeId, user);

        if (node) {
            // I decided to go with timeout here but a more stable solution would involve using cron instead. See Readme for more details
            setTimeout(async function () {
                await UserService.changeCurrency(node.profit, user);
            }, new Date(node.running_until).getTime() - new Date().getTime());

            ctx.body = node;
        } else {
            ctx.throw(403, {error: 'Node is still running'});
        }

    }

}

module.exports = NodesController;