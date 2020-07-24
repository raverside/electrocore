import React, { Component } from 'react';
import './css/Game.css';
import Grid from './Grid';

class Game extends Component {

    render() {
        return (
            <div className="game-wrapper">
                <Grid />
            </div>
        );
    }

}

export default Game;
