import React from 'react';
import './button.sass';

const Button = (props) => {
    return (
        <button className="button">
            {props.children}
        </button>
    );
}
 
export default Button;