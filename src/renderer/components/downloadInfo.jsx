import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './downloadInfo.sass';

const DownloadInfo = (props) => {
    return (
        <div className={`downloadInfo ${props.className} ${props.enabled?'':'downloadInfo_state-disabled'}`}>
            <div className="downloadInfo__progressbar-wrapper">
                <CircularProgressbar
                    className='downloadInfo__progressbar'
                    value={props.value}
                    maxValue={props.maxValue}
                    text={`${Math.trunc(props.value*100/props.maxValue)}%`}
                />
            </div>

            <div className="downloadInfo__content-wrapper">
                <p className="downloadInfo__action">
                    {props.action}
                </p>
                    
                <p className="downloadInfo__filename">
                    {props.filename}
                </p>   
            </div>
        </div>
    );
}
 
export default DownloadInfo;