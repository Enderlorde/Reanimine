import React, { useState } from 'react';
import switch_styles from './switch.module.css';

const Switch = (props) => {
    const [state, setState] = useState(props.active?props.active:false)

    const switchState = () => {
        setState(!state);
    }

    return (
        <div className={`${switch_styles.wrapper}`} onClick={() => switchState()}>
            <p>{props.text.en}</p>

            <div className={`${switch_styles.switch}`}>
                <ul className={`${switch_styles.slider} ${state?"":switch_styles.disabled}`}>
                    <li className={`${switch_styles.states} ${switch_styles.green}`}>-</li>
                    <li className={`${switch_styles.states} ${switch_styles.knob}`}></li>
                    <li className={`${switch_styles.states} ${switch_styles.grey}`}>o</li>
                </ul>
            </div>
        </div>
    );
}
 
export default Switch;