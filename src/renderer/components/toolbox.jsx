import React from 'react';
import toolbox_styles from './toolbox.module.css';

const Toolbox = (props) => {
    return (
        <div className={`${toolbox_styles.toolbox} ${props.className}`}>
            <button className={toolbox_styles.button} title="Minimize" onClick={() => window.launcherAPI.minimize()}>_</button>
            <button className={toolbox_styles.button} title="Close" onClick={() => window.launcherAPI.close()}>x</button>
        </div>
    );
}
 
export default Toolbox;