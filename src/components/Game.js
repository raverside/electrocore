import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { MainContext } from "../Context";
import User from './User';
import Grid from './Grid';
import {toast} from "react-toastify";
import './css/Game.css';

class Game extends Component {

    static contextType = MainContext;

    componentDidMount() {
        if (this.context.isLoggedIn && this.context.user.offline_profits > 0) {
            toast.success(<p>The city keeps shining even when you sleep. You earned <span>¥{this.context.user.offline_profits} </span> while you were away</p>, {autoClose: 10000});
        }
    }

    render() {
        if (!this.context.isLoggedIn) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="game-wrapper">
                <User />
                <Grid />
            </div>
        );
    }

}

export default Game;
