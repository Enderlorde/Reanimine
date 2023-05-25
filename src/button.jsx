import React from 'react';
import './button.sass';

const Button = (props) => {
    return (
        <button onClick={props.onClick} className={`${props.disabled?'button button_disabled':'button'}`} type="button">
            {props.children}
        </button>
    );
}
 
export default Button;