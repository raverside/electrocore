import React, { Component } from 'react';
import './css/Game.css';
import Grid from './Grid';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { nodes: "" };
    }

    getNodes() {
        fetch("http://localhost:" + process.env.REACT_APP_NODE_PORT + "/getNodes")
            .then(res => this.setState({ nodes: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.getNodes();
    }

    render() {
        return (
            <div className="game-wrapper">
                <Grid/>
            </div>
        );
    }
}

export default Game;
