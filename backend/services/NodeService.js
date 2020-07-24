const Node = require('../models/Node');

class NodeService {
    static async createNodes() {
        const nodes = [];

        const lightbulb = new Node('lightbulb', 50, 100, 200);
        nodes.push(lightbulb);

        const disco = new Node('disco', 2500, 3000, 1000);
        nodes.push(disco);

        return nodes;
    }
}

module.exports = NodeService;