import React, { Component } from 'react';
import './css/Node.css';

class Node extends Component {

    onClick() {

    }

    render() {
        return (
            <div className="electro-grid_node">
                <p className="electro-grid_node--name">{this.props.name}</p>
                <button className="electro-grid_node--interact" onClick={this.onClick}>
                    ¥{this.props.initial_cost}
                </button>
            </div>
        );
    };

}

export default Node;
