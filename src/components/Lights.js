import React, { Component } from 'react';
import './css/Lights.css';

class Lights extends Component {

    render() {
        return (
            <div className="electro-lights">
                <div className="powertower">
                    <div className="level level_1">
                        <div className="powertower_leftpanel" />
                        <div className="powertower_rightpanel" />
                    </div>
                    <div className="level level_2">
                        <div className="powertower_leftpanel" />
                        <div className="powertower_rightpanel" />
                    </div>
                    <div className="level level_3">
                        <div className="powertower_leftpanel" />
                        <div className="powertower_rightpanel" />
                    </div>
                </div>
                <div className="cryptobank">
                    <div className="level level_1">
                        <div className="cryptobank_panel" />
                    </div>
                    <div className="level level_2">
                        <div className="cryptobank_panel" />
                    </div>
                    <div className="level level_3">
                        <div className="cryptobank_panel" />
                    </div>
                    <div className="level level_4">
                        <div className="cryptobank_panel" />
                    </div>
                    <div className="level level_5">
                        <div className="cryptobank_panel" />
                    </div>
                    <div className="level level_6">
                        <div className="cryptobank_panel" />
                    </div>
                </div>
                <div className="cyberstorage">
                    <div className="level level_1">
                        <div className="cyberstorage_leftpanel" />
                        <div className="cyberstorage_rightpanel" />
                    </div>
                    <div className="level level_2">
                        <div className="cyberstorage_leftpanel" />
                        <div className="cyberstorage_rightpanel" />
                    </div>
                    <div className="level level_3">
                        <div className="cyberstorage_leftpanel" />
                        <div className="cyberstorage_rightpanel" />
                    </div>
                </div>
            </div>
        );
    }

}

export default Lights;
