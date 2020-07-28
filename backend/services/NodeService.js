const Node = require('../models/Node');

class NodeService {

    static async createNodes(User) {
        if (User.nodes.length > 0) {
            return User.nodes;
        }

        const nodes = [];

        const cyberstorage = new Node(1, 'cyberstorage', 50, 100, 3, 500, 50, 3);
        nodes.push(cyberstorage);

        const powertower = new Node(2, 'powertower', 2500, 1000, 3, 2500, 100, 10);
        nodes.push(powertower);

        const cryptobank = new Node(3, 'cryptobank', 5000, 3000, 6, 5000, 1000, 30);
        nodes.push(cryptobank);

        try {
            await User.updateOne({nodes: nodes});
        } catch(err) {
            console.log(err);
        }

        return nodes;
    }

    static async getInitialCost(nodeId, User) {
        const node = await User.nodes.find(node => node.id === nodeId);

        return node.initial_cost;
    }

    static async getUpgradeCost(nodeId, User) {
        const node = await User.nodes.find(node => node.id === nodeId);

        return node.upgrade_cost;
    }

    static async getAutoCost(nodeId, User) {
        const node = await User.nodes.find(node => node.id === nodeId);

        return node.auto_cost;
    }

    static async unlockNode(nodeId, User) {
        try {
            const nodeIndex = User.nodes.findIndex(node => node.id === nodeId);
            User.nodes[nodeIndex].bought = true;
            User.markModified('nodes');
            await User.save();

            return User.nodes[nodeIndex];
        } catch (err) {
            console.log(err);
        }
    }

    static async upgradeNode(nodeId, User) {
        try {
            const nodeIndex = User.nodes.findIndex(node => node.id === nodeId);
            User.nodes[nodeIndex].level = Math.min(User.nodes[nodeIndex].level + 1,  User.nodes[nodeIndex].maxLevel);
            User.nodes[nodeIndex].upgrade_cost = User.nodes[nodeIndex].upgrade_cost * User.nodes[nodeIndex].level;
            User.nodes[nodeIndex].profit = User.nodes[nodeIndex].profit * User.nodes[nodeIndex].level;
            User.markModified('nodes');
            await User.save();

            return User.nodes[nodeIndex];
        } catch (err) {
            console.log(err);
        }
    }

    static async autoNode(nodeId, User) {
        try {
            const nodeIndex = User.nodes.findIndex(node => node.id === nodeId);
            User.nodes[nodeIndex].auto = true;
            User.markModified('nodes');
            await User.save();

            return User.nodes[nodeIndex];
        } catch (err) {
            console.log(err);
        }
    }

    static async executeNode(nodeId, User) {
        try {
            const nodeIndex = User.nodes.findIndex(node => node.id === nodeId);
            if (typeof User.nodes[nodeIndex].running_until !== 'undefined' && new Date(User.nodes[nodeIndex].running_until) > new Date()) {
                return User.nodes[nodeIndex];
            }
            User.nodes[nodeIndex].running_start = new Date().getTime();
            User.nodes[nodeIndex].running_until = new Date().getTime() + (User.nodes[nodeIndex].seconds * 1000);
            User.markModified('nodes');
            await User.save();

            return User.nodes[nodeIndex];
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = NodeService;