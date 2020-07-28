const Node = require('../models/Node');

class NodeService {

    static async createNodes(User) {
        if (User.nodes.length > 0) {
            return User.nodes;
        }

        const nodes = [];

        const cyberstorage = new Node(1, 'cyberstorage', 50, 100, 3, 500, 50, 3);
        nodes.push(cyberstorage);

        const powertower = new Node(2, 'powertower', 2500, 3000, 3, 1000, 100, 10);
        nodes.push(powertower);

        const cryptobank = new Node(3, 'cryptobank', 5000, 7000, 6, 5000, 300, 30);
        nodes.push(cryptobank);

        try {
            await User.updateOne({nodes: nodes});
        } catch(err) {
            console.log(err);
        }

        return nodes;
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