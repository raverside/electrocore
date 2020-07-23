const Node = require('../models/Node');

class NodeService {
    static async createNodes() {
        const nodes = [];
        const node = new Node('lightbulb', 100, 200);
        nodes.push(node);

        return nodes;
    }
}

module.exports = NodeService;