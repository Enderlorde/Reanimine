import React from 'react';
import './toolbox.sass';

const Toolbox = (props) => {
    return (
        <div className={props.className}>
            <button className="toolbox__button" title="Minimize" onClick={() => window.something.minimize()}>_</button>
            <button className="toolbox__button" title="Close" onClick={() => window.something.close()}>x</button>
        </div>
    );
}
 
export default Toolbox;