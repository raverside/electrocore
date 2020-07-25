import React, { Component } from 'react';
import './css/Node.css';

class Node extends Component {

    render() {
        return (
            <div className="electro-grid_node">
                {this.props.name}
            </div>
        );
    };

}

export default Node;
