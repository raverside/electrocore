const Nodes = require('../models/Node');
const mongoose = require('mongoose');

class NodeService {

    /**
     * Create the Node instances for the User (or return existing nodes)
     *
     * @param User
     * @returns {Promise<Array>}
     */
    static async createNodes(User) {
        if (typeof User.nodes !== 'undefined' && User.nodes.length > 0) {
            return User.nodes;
        }

        const nodes = [];

        const cyberstorage = {
            id: 1,
            name: 'cyberstorage',
            initial_cost: 50,
            upgrade_cost: 100,
            maxLevel: 3,
            auto_cost: 500,
            profit: 50,
            seconds: 3,
            level: 1
        };

        const powertower = {
            id: 2,
            name: 'powertower',
            initial_cost: 2500,
            upgrade_cost: 1000,
            maxLevel: 3,
            auto_cost: 2500,
            profit: 100,
            seconds: 10,
            level: 1
        };

        const cryptobank = {
            id: 3,
            name: 'cryptobank',
            initial_cost: 5000,
            upgrade_cost: 3000,
            maxLevel: 6,
            auto_cost: 5000,
            profit: 1000,
            seconds: 30,
            level: 1
        };

        nodes.push(cyberstorage, powertower, cryptobank);

        try {
            await User.updateOne({nodes: nodes});
        } catch(err) {
            console.log(err);
        }

        return nodes;
    }

    /**
     * Return Node unlock cost
     *
     * @param nodeId
     * @param User
     * @returns {Promise<number>}
     */
    static async getInitialCost(nodeId, User) {
        const node = await User.nodes.find(node => node.id === nodeId);

        return node.initial_cost;
    }

    /**
     * Return upgrade cost
     *
     * @param nodeId
     * @param User
     * @returns {Promise<number>}
     */
    static async getTotalUpgradeCost(nodeId, User) {
        const node = await User.nodes.find(node => node.id === nodeId);

        return node.upgrade_cost;
    }

    /**
     * Return Node automate cost
     *
     * @param nodeId
     * @param User
     * @returns {Promise<number>}
     */
    static async getAutoCost(nodeId, User) {
        const node = await User.nodes.find(node => node.id === nodeId);

        return node.auto_cost;
    }

    /**
     * Unlock the Node
     *
     * @param nodeId
     * @param User
     * @returns {Promise<Object>}
     */
    static async unlockNode(nodeId, User) {
        try {
            const node = User.nodes.find(node => node.id === nodeId);

            node.bought = true;

            User.markModified('nodes');
            await User.save();

            return node;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Upgrade the Node
     *
     * @param nodeId
     * @param User
     * @returns {Promise<Object>}
     */
    static async upgradeNode(nodeId, User) {
        try {
            const nodeIndex = User.nodes.findIndex(node => node.id === nodeId);
            const node = User.nodes[nodeIndex];

            node.level = Math.min(node.level + 1,  node.maxLevel);
            node.upgrade_cost = node.upgrade_cost * node.level;
            node.profit = node.profit * node.level;

            User.markModified('nodes');
            await User.save();

            return node;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Enable Auto Mode
     *
     * @param nodeId
     * @param User
     * @returns {Promise<Object>}
     */
    static async autoNode(nodeId, User) {
        try {
            const nodeIndex = User.nodes.findIndex(node => node.id === nodeId);
            const node = User.nodes[nodeIndex];

            node.auto = true;

            User.markModified('nodes');
            await User.save();

            return node;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Run the Node
     *
     * @param nodeId
     * @param User
     * @returns {Promise<number>}
     */
    static async executeNode(nodeId, User) {
        try {
            const nodeIndex = User.nodes.findIndex(node => node.id === nodeId);
            const node = User.nodes[nodeIndex];

            if (typeof node.running_until !== 'undefined' && new Date(node.running_until) > new Date()) { // return if the Node is still being executed
                return false;
            }

            node.running_start = new Date().getTime();
            node.running_until = new Date().getTime() + (node.seconds * 1000);

            User.markModified('nodes');
            await User.save();

            return node;
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = NodeService;