import React, { Component } from "react";

const MainContext = React.createContext(null);

class MainProvider extends Component {

    state = {
        auth: {
            username: "",
            password: ""
        },
        user: {
            username: "",
            currency: 0
        },
        isLoggedIn: false,
    };

    change = {
        setLogin: e => {
            const data = e.target.value;
            switch (e.target.getAttribute("id")) {
                case "username":
                    this.setState(state => ({
                        ...state,
                        auth: {
                            ...state.auth,
                            username: data
                        }
                    }));
                    break;
                case "password":
                    this.setState(state => ({
                        ...state,
                        auth: {
                            ...state.auth,
                            password: data
                        }
                    }));
                    break;
                default:
                    return;
            }
        },
        setUser: user => {
            this.setState(state => ({
                ...state,
                user: {
                    ...state.user,
                    username: user.username,
                    currency: user.currency,
                    offline_profits: user.offline_profits,
                    token: user.token
                },
                isLoggedIn: true
            }));
        },
        changeCurrency: currency => {
            this.setState(state => ({
                ...state,
                user: {
                    ...state.user,
                    currency: Math.max(state.user.currency + currency, 0),
                }
            }));
        }
    };

    dataMethods = {
        updateCurrency: async() => {
            const response = await fetch("http://localhost:" + process.env.REACT_APP_NODE_PORT + "/getUser", {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.state.user.token,
                }
            });
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();

            this.setState(state => ({
                ...state,
                user: {
                    ...state.user,
                    currency: json.currency
                }
            }));
        }
    };

    render() {
        return (
            <MainContext.Provider
                value={{
                    ...this.state,
                    methods: this.change,
                    dataMethods: this.dataMethods
                }}
            >
                {this.props.children}
            </MainContext.Provider>
        );
    }
}

const MainConsumer = MainContext.Consumer;

export { MainContext, MainProvider, MainConsumer };