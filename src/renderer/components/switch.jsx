import React from 'react';
import './switch.sass';

const Switch = (props) => {
    return (
        <div className="switch">
            <p>{props.text}</p>

            <div className={`switch__button ${props.disabled?"switch__button_disabled":""}`}>
                <ul className="switch__buttonSlider">
                    <li className="switch__buttonStates switch__buttonStates_green">-</li>
                    <li className="switch__buttonStates switch__buttonStates_knob"></li>
                    <li className="switch__buttonStates switch__buttonStates_grey">o</li>
                </ul>
            </div>
        </div>
    );
}
 
export default Switch;