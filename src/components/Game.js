import React, { Component } from 'react';
import './css/Game.css';
import Grid from './Grid';
import Lights from './Lights';

class Game extends Component {

    render() {
        return (
            <div className="game-wrapper">
                <Grid />
                <Lights />
            </div>
        );
    }

}

export default Game;
