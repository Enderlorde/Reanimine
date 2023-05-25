import React from 'react';
import './progress.sass';

const Progress = (props) => {
    return (
        <div className={props.disabled?"progress progress_disabled":"progress"}>
            <progress max={props.status.total} value={props.status.current}></progress>
            <p className='progress__file'>Downloading: {props.status.type}</p>
        </div>
    );
}
 
export default Progress;