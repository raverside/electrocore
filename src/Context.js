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
                    currency: user.currency
                },
                isLoggedIn: true
            }));
        }
    };

    dataMethods = {

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