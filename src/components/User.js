import React, { Component } from 'react';
import { MainContext } from "../Context";
import './css/User.css';

class User extends Component {

    static contextType = MainContext;

    constructor(props) {
        super(props);

        this.render = this.render.bind(this);
    }

    render() {
        return (
            <div id="user_interface">
                ¥{this.context.user.currency}
            </div>
        );
    }

}

export default User;
