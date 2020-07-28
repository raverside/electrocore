import React, { Component } from 'react';
import './css/Lights.css';
import {MainContext} from "../Context";

class Lights extends Component {

    static contextType = MainContext;

    render() {
        const lights = [];

        if (this.props.bought) {
            let i=1;
            switch (this.props.id) {
                case 3:
                    for (i; i <= this.props.level; i++) {
                        lights.push(<div className={"level level_" + i} key={i}>
                            <div className={this.props.name + "_panel"}/>
                        </div>);
                    }
                    break;
                default:
                    for (i; i <= this.props.level; i++) {
                        lights.push(<div className={"level level_" + i} key={i}>
                            <div className={this.props.name + "_leftpanel"}/>
                            <div className={this.props.name + "_rightpanel"}/>
                        </div>);
                    }
                    break;
            }
        }

        return (
            <div className="electro-lights">
                <div className={this.props.name}>
                    {lights}
                </div>
            </div>
        );
    }

}

export default Lights;
