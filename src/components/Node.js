import React, { Component } from 'react';
import './css/Node.css';

class Node extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="electro-grid_node">
                {this.props.name}
            </div>
        );
    };

}

export default Node;
