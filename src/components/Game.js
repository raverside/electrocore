import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { MainContext } from "../Context";
import './css/Game.css';
import User from './User';
import Grid from './Grid';
import Lights from './Lights';

class Game extends Component {

    static contextType = MainContext;

    render() {
        if (!this.context.isLoggedIn) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="game-wrapper">
                <User />
                <Grid />
                <Lights />
            </div>
        );
    }

}

export default Game;
