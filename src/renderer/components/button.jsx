import React from 'react';
import './button.sass';

const Button = (props) => {
    return (
        <button onClick={props.onClick} className={`${props.className?props.className:"button"}`} disabled={props.disabled} type="button">
            {props.children}
        </button>
    );
}
 
export default Button;