import React from 'react';
import './button.sass';

const Button = (props) => {
    return (
        <button onClick={props.onClick} className={`button ${props.className} ${props.enabled?"":"button_state-disabled"}`} disabled={props.disabled} type="button">
            {props.children}
        </button>
    );
}
 
export default Button;