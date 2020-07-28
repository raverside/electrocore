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
        const user = await UserService.getUserById(ctx.decode.id);
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
        const user = await UserService.getUserById(ctx.decode.id);
        const nodeId = ctx.request.body.id;
        const nodeCost = await NodeService.getInitialCost(nodeId, user);

        if (user.hasEnoughCurrency(nodeCost)) {
            const node = await NodeService.unlockNode(nodeId, user);
            await UserService.changeCurrency(-node.initial_cost, user);

            ctx.body = node;
        } else {
            ctx.throw(422, {error: 'Not enough currency'});
        }
    }

    /**
     * Upgrade the Node if the User has enough currency
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async upgradeNode(ctx) {
        const user = await UserService.getUserById(ctx.decode.id);
        const nodeId = ctx.request.body.id;
        const nodeCost = await NodeService.getUpgradeCost(nodeId, user);

        if (user.hasEnoughCurrency(nodeCost)) {
            const node = await NodeService.upgradeNode(nodeId, user);
            await UserService.changeCurrency(-node.upgrade_cost * node.level, user);

            ctx.body = node;
        } else {
            ctx.throw(422, {error: 'Not enough currency'});
        }
    }

    /**
     * Set the Node to auto mode if the User has enough currency
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async autoNode(ctx) {
        const user = await UserService.getUserById(ctx.decode.id);
        const nodeId = ctx.request.body.id;
        const nodeCost = await NodeService.getAutoCost(nodeId, user);

        if (user.hasEnoughCurrency(nodeCost)) {
            const node = await NodeService.autoNode(nodeId, user);
            await UserService.changeCurrency(-node.auto_cost, user);

            ctx.body = node;
        } else {
            ctx.throw(422, {error: 'Not enough currency'});
        }
    }

    /**
     * Execute the Node and pay the User (eventually)
     *
     * @param ctx
     * @returns {Promise<Object>}
     */
    static async executeNode(ctx) {
        const user = await UserService.getUserById(ctx.decode.id);
        const nodeId = ctx.request.body.id;

        const node = await NodeService.executeNode(nodeId, user);
        if (node) {
            setTimeout(async function () {
                await UserService.changeCurrency(node.profit, user);
            }, new Date(node.running_until).getTime() - new Date().getTime());
        }

        ctx.body = node;
    }

}

module.exports = NodesController;