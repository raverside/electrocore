import React, {Component} from "react";
import './../css/Auth.css';
import { MainContext } from "../../Context";
import { Link, Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

class Register extends Component {

    static contextType = MainContext;

    constructor(props) {
        super(props);

        this.register = this.register.bind(this);
    }

    async register(e) { // #TODO Rearrange this
        e.preventDefault();
        try {
            const bodyData = {
                username: this.context.auth.username,
                password: this.context.auth.password
            };
            const response = await fetch(process.env.REACT_APP_DOMAIN + ":" + process.env.REACT_APP_NODE_PORT + "/register", {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bodyData)
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();

            this.context.methods.setUser(json);
        } catch (err) {
            console.log(err);
            toast.error('Username is taken or not allowed');
        }
    }

    render() {
        if (this.context.isLoggedIn) {
            return <Redirect to="/"/>
        }

        return (
            <div className="auth_container">
                <div id="logo">electrocore</div>
                <form>
                    <label htmlFor="username">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            aria-label="username"
                            aria-required="true"
                            placeholder="Username"
                            onChange={this.context.methods.setLogin}
                            value={this.context.auth.username}
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            aria-label="password"
                            aria-required="true"
                            placeholder="Password"
                            onChange={this.context.methods.setLogin}
                            value={this.context.auth.password}
                        />
                    </label>
                    <button type="submit" className="auth_button" onClick={this.register}>Sign Up</button>
                </form>
                <p id="sign_text">
                    Already signed up? <Link to="/login">Login</Link>
                </p>
            </div>
        );
    }
}

export default Register;