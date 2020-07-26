import React, { Component } from 'react';
import './css/Node.css';
import {MainContext} from "../Context";
import { toast } from 'react-toastify';

class Node extends Component {

    static contextType = MainContext;

    constructor(props) {
        super(props);

        this.buyNode = this.buyNode.bind(this);
    }

    buyNode() {
        if (!this.props.bought) {
            if (this.props.initial_cost > this.context.user.currency) {
                toast.error('Not enough ¥llumination');
            } else {
                //buy
            }
        } else {
            toast.error('This node is already yours');
        }
    }

    upgradeNode() {

    }

    autoNode() {

    }

    executeNode() {

    }

    render() {
        let nodeActions;
        if (!this.props.bought) {
            nodeActions = <>
                <button className="electro-grid_node--buy" onClick={this.buyNode}>
                    ¥{this.props.initial_cost}
                </button>
            </>;
        } else {
            nodeActions = <>
                {this.props.level < this.props.maxLevel && <button className="electro-grid_node--upgrade" onClick={this.upgradeNode}><span>upgrade</span>¥{this.props.upgrade_cost}</button>}
                {!this.props.auto && <button className="electro-grid_node--auto" onClick={this.autoNode}><span>automate</span>¥{this.props.auto_cost}</button>}
                {!this.props.auto && <button className="electro-grid_node--run" onClick={this.executeNode}>Run</button>}
            </>;
        }

        return (
            <div className="electro-grid_node">
                <p className="electro-grid_node--name">{this.props.name}</p>
                <div className="electro-grid_node--actions">{nodeActions}</div>
            </div>
        );
    };

}

export default Node;
