import React, { Component } from 'react';
import {MainContext} from "../Context";
import './css/Grid.css';
import Node from './Node';
import {toast} from "react-toastify";

class Grid extends Component {

    static contextType = MainContext;

    constructor(props) {
        super(props);
        this.state = { nodes: [], retry_nodes: 5 };

        this.getNodes = this.getNodes.bind(this);
    }

    async componentDidMount() {
        await this.getNodes();
    }

    async getNodes() { // #TODO Rearrange this
        try {
            const response = await fetch(process.env.REACT_APP_DOMAIN + ":" + process.env.REACT_APP_NODE_PORT + "/getNodes", {
                headers: {
                    "x-access-token": this.context.user.token
                }
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();

            this.setState({ nodes: json });
        } catch (error) {
            this.setState({ retry_nodes: this.state.retry_nodes - 1});
            if (this.state.retry_nodes > 0) {
                this.getNodes();
            } else {
                toast.error('Can\'t get the Nodes. Try later ');
            }
            console.log(error);
        }
    }

    renderNode(node) {
        return (
            <Node
                key={node.id}
                id={node.id}
                name={node.name}
                initial_cost={node.initial_cost}
                upgrade_cost={node.upgrade_cost}
                auto_cost={node.auto_cost}
                profit={node.profit}
                seconds={node.seconds}
                level={node.level}
                maxLevel={node.maxLevel}
                auto={node.auto}
                running_start={node.running_start}
                running_until={node.running_until}
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
            <div className="electro-grid-wrapper">
                <div className="electro-grid">{this.renderNodes()}</div>
            </div>
        );
    }

}

export default Grid;
