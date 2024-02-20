import React from 'react';
import './toolbox.sass';

const Toolbox = (props) => {
    return (
        <div className={props.className}>
            <button className="toolbox__button" title="Minimize" onClick={() => window.launcherAPI.minimize()}>_</button>
            <button className="toolbox__button" title="Close" onClick={() => window.launcherAPI.close()}>x</button>
        </div>
    );
}
 
export default Toolbox;