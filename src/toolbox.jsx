import React from 'react';
import './toolbox.sass';

const Toolbox = (props) => {
    return (
        <div className={props.className}>
            <button className="toolbox__button">_</button>
            <button onClick={() => window.something.close()} className="toolbox__button">x</button>
        </div>
    );
}
 
export default Toolbox;