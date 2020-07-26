import React, { Component } from 'react';
import './css/Grid.css';
import Node from './Node';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = { nodes: [] };
    }

    async componentDidMount() {
        await this.getNodes();
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

    renderNode(node) {
        return (
            <Node
                key={node.id}
                name={node.name}
                initial_cost={node.initial_cost}
                upgrade_cost={node.upgrade_cost}
                auto_cost={node.auto_cost}
                profit={node.profit}
                seconds={node.seconds}
                level={node.level}
                maxLevel={node.maxLevel}
                auto={node.auto}
                bought={node.bought}
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
