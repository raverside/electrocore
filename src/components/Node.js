import React, { Component } from 'react';
import './css/Node.css';
import {MainContext} from "../Context";
import { toast } from 'react-toastify';
import Lights from "./Lights";

class Node extends Component {

    static contextType = MainContext;

    constructor(props) {
        super(props);

        this.state = {
            bought: this.props.bought,
            auto: this.props.auto,
            level: this.props.level,
            profit: this.props.profit,
            upgrade_cost: this.props.upgrade_cost,
            running_start: this.props.running_start,
            running_until: this.props.running_until,
            node_progress: 0,
            node_progress_seconds: '',
            retry_node: 10
        };

        this.buyNode = this.buyNode.bind(this);
        this.upgradeNode = this.upgradeNode.bind(this);
        this.autoNode = this.autoNode.bind(this);
        this.autoExecuteNode = this.autoExecuteNode.bind(this);
        this.executeNode = this.executeNode.bind(this);
    }

    componentDidMount() {
        this.updateProgressBar(true);
        this.autoExecuteNode();
    }

    updateProgressBar(isFirstRender) {
        const now = new Date();
        if (new Date(this.state.running_until) > now) {
            const secondsLeft = Math.ceil((new Date(this.state.running_until) - new Date()) / 1000);
            const nodeProgress = 100 - Math.min(Math.max(Math.round((secondsLeft / this.props.seconds) * 100), 0), 100);

            const $this = this;
            this.setState({node_progress: nodeProgress, node_progress_seconds: 'all linear '+secondsLeft+'s'}, function(){
                setTimeout(function () {
                    $this.setState({node_progress: 100});
                }, 300);
            });

            setTimeout(function(){
                $this.setState({node_progress_seconds: '', node_progress: 0});
                if (isFirstRender) {
                    $this.context.dataMethods.updateCurrency();
                }
                $this.autoExecuteNode();
            }, secondsLeft * 1000);
        }
    }

    async buyNode() {
        if (!this.props.bought) {
            if (this.props.initial_cost > this.context.user.currency) {
                toast.error('Not enough ¥llumination');
            } else {
                try {
                    const bodyData = {
                        id: this.props.id
                    };
                    const response = await fetch("http://localhost:" + process.env.REACT_APP_NODE_PORT + "/buyNode", {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": this.context.user.token,
                        },
                        body: JSON.stringify(bodyData)
                    });
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    const json = await response.json();
                    this.setState({ bought: json.bought });
                    this.context.methods.changeCurrency(-json.initial_cost);
                } catch (err) {
                    console.log(err);
                    toast.error('Not enough ¥llumination');
                }
            }
        } else {
            toast.error('This node is already yours');
        }
    }

    async upgradeNode() {
        if (this.state.level < this.props.maxLevel) {
            if (this.state.upgrade_cost > this.context.user.currency) {
                toast.error('Not enough ¥llumination');
            } else {
                try {
                    const bodyData = {
                        id: this.props.id
                    };
                    const response = await fetch("http://localhost:" + process.env.REACT_APP_NODE_PORT + "/upgradeNode", {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": this.context.user.token,
                        },
                        body: JSON.stringify(bodyData)
                    });
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    const json = await response.json();
                    this.context.methods.changeCurrency(-this.state.upgrade_cost);
                    this.setState({ level: json.level, upgrade_cost: json.upgrade_cost });
                } catch (err) {
                    console.log(err);
                    toast.error('Not enough ¥llumination');
                }
            }
        } else {
            toast.error('This node is already fully upgraded');
        }
    }

    async autoNode() {
        if (!this.state.auto) {
            if (this.props.auto_cost > this.context.user.currency) {
                toast.error('Not enough ¥llumination');
            } else {
                try {
                    const bodyData = {
                        id: this.props.id
                    };
                    const response = await fetch("http://localhost:" + process.env.REACT_APP_NODE_PORT + "/autoNode", {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json",
                            "x-access-token": this.context.user.token,
                        },
                        body: JSON.stringify(bodyData)
                    });
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    const json = await response.json();
                    this.setState({ auto: json.auto });
                    this.context.methods.changeCurrency(-json.auto_cost);
                    this.autoExecuteNode();
                } catch (err) {
                    console.log(err);
                    toast.error('Not enough ¥llumination');
                }
            }
        } else {
            toast.error('This node is already automated');
        }
    }

    async autoExecuteNode() {
        if (this.state.auto && (!this.state.running_until || new Date(this.state.running_until) < new Date())) {
            await this.executeNode();
        }
    }

    async executeNode() {
        if (!this.state.running_until || new Date(this.state.running_until) < new Date()) {
            try {
                const bodyData = {
                    id: this.props.id
                };
                const response = await fetch("http://localhost:" + process.env.REACT_APP_NODE_PORT + "/executeNode", {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": this.context.user.token,
                    },
                    body: JSON.stringify(bodyData)
                });
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const json = await response.json();
                this.setState({ running_start: json.running_start, running_until: json.running_until });

                const executionLength = Math.max(new Date(json.running_until) - new Date(), 0);
                const methods = this.context.methods;
                this.updateProgressBar(false);
                setTimeout(function(){
                    methods.changeCurrency(json.profit);
                    this.setState({node_progress_seconds: '', node_progress: 0});
                }.bind(this), executionLength);
            } catch (err) {
                console.log(err);
                this.setState({ retry_node: this.state.retry_node - 1});
                if (this.state.retry_node > 0) {
                    this.executeNode();
                } else {
                    toast.error('Can\'t execute ' + this.state.name);
                }
            }
        } else {
            toast.error('This node is already running');
        }
    }

    render() {
        let nodeActions;
        if (!this.state.bought) {
            nodeActions = <>
                <button className="electro-grid_node--buy" onClick={this.buyNode}>
                    ¥{this.props.initial_cost}
                </button>
            </>;
        } else {
            nodeActions = <>
                {this.state.level < this.props.maxLevel && <button className="electro-grid_node--upgrade" onClick={this.upgradeNode}><span>upgrade</span>¥{this.state.upgrade_cost}</button>}
                {!this.state.auto && <button className="electro-grid_node--auto" onClick={this.autoNode}><span>automate</span>¥{this.props.auto_cost}</button>}
                {!this.state.auto && <button className="electro-grid_node--run" onClick={this.executeNode}>Run</button>}
            </>;
        }

        return (
            <div className="electro-grid_node-wrapper">
                <div className="electro-grid_node">
                    <p className="electro-grid_node--name">{this.props.name}{this.state.bought && <span> [{(this.state.level === this.props.maxLevel) ? 'max' : this.state.level}]</span>}</p>
                    <div className="electro-grid_node--actions">{nodeActions}</div>
                    <div className="electro-grid_node--progress_bar" style={{ width: this.state.node_progress+'%', transition: this.state.node_progress_seconds }} />
                </div>
                <Lights
                    level={this.state.level}
                    id={this.props.id}
                    name={this.props.name}
                    bought={this.state.bought}
                />
            </div>
        );
    };

}

export default Node;
