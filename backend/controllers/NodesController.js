const NodeService = require('../services/NodeService');
const UserService = require('../services/UserService');
const Node = require('../models/Node');
const User = require('../models/User');

class NodesController {

    static async getNodes(ctx) {
        const user = await User.findOne({ _id: ctx.decode.id });
        const nodes = await NodeService.createNodes(user);

        ctx.body = nodes;
    }

    static async buyNode(ctx) {
        const user = await User.findOne({ _id: ctx.decode.id });
        const nodeId = ctx.request.body.id;

        const node = await NodeService.unlockNode(nodeId, user);
        await UserService.changeCurrency(-node.initial_cost, user);

        ctx.body = node;
    }

    static async upgradeNode(ctx) {
        const user = await User.findOne({ _id: ctx.decode.id });
        const nodeId = ctx.request.body.id;

        const node = await NodeService.upgradeNode(nodeId, user);
        await UserService.changeCurrency(-node.upgrade_cost * node.level, user);

        ctx.body = node;
    }

    static async autoNode(ctx) {
        const user = await User.findOne({ _id: ctx.decode.id });
        const nodeId = ctx.request.body.id;

        const node = await NodeService.autoNode(nodeId, user);
        await UserService.changeCurrency(-node.auto_cost, user);

        ctx.body = node;
    }

    static async executeNode(ctx) {
        const user = await User.findOne({ _id: ctx.decode.id });
        const nodeId = ctx.request.body.id;

        const node = await NodeService.executeNode(nodeId, user);
        setTimeout(async function(){
            await UserService.changeCurrency(node.profit, user);
        }, new Date(node.running_until).getTime() - new Date().getTime());

        ctx.body = node;
    }

}

module.exports = NodesController;