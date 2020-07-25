const Node = require('../models/Node');

class NodeService {

    static async createNodes() {
        const nodes = [];

        const cyberstorage = new Node('cyberstorage', 50, 100, 200);
        nodes.push(cyberstorage);

        const powertower = new Node('powertower', 2500, 3000, 1000);
        nodes.push(powertower);

        const cryptobank = new Node('cryptobank', 5000, 7000, 3000);
        nodes.push(cryptobank);

        return nodes;
    }

}

module.exports = NodeService;