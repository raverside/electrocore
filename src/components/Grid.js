import React, { Component } from 'react';
import './css/Grid.css';
import Node from './Node';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = { nodes: [] };
    }

    async getNodes() { // #TODO Rearrange this
        try {
            const response = await fetch("http://localhost:" + process.env.REACT_APP_NODE_PORT + "/getNodes");
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();

            this.setState({ nodes: json });
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        await this.getNodes();
    }

    renderNode(node) {
        return (
            <Node
                name={node.name}
                initial_cost={node.initial_cost}
                upgrade_cost={node.upgrade_cost}
                profit={node.profit}
                level={node.level}
                auto={node.auto}
                key={node.name}
            />
        );
    }

    renderNodes() {
        const nodes = this.state.nodes;
        if (nodes.length > 0) {
            const renderedNodes = nodes.map(function (node) {
                return this.renderNode(node);
            }, this);

            return renderedNodes;
        }
    }

    render() {
        return (
            <div className="electro-grid">
                {this.renderNodes()}
            </div>
        );
    }
}

export default Grid;
