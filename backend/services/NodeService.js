const Node = require('../models/Node');

class NodeService {

    static async createNodes() {
        const nodes = [];

        const cyberstorage = new Node(1, 'cyberstorage', 50, 100, 3, 500, 200, 3);
        nodes.push(cyberstorage);

        const powertower = new Node(2, 'powertower', 2500, 3000, 3, 1000, 1000, 10);
        nodes.push(powertower);

        const cryptobank = new Node(3, 'cryptobank', 5000, 7000, 6, 5000, 3000, 30);
        nodes.push(cryptobank);

        return nodes;
    }

}

module.exports = NodeService;