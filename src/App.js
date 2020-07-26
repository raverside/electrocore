import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

// Components

import Game from './components/Game';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Game} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        );
    }

}

export default App;
