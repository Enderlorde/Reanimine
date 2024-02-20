import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './notification.sass';

const Notification = (props) => {
    return (
        <div className={`notification ${props.className} ${props.enabled?'':'notification_state-disabled'}`}>
            <CircularProgressbar
                className='notification__progressbar'
                value={props.value}
                maxValue={props.maxValue}
                text={`${Math.trunc(props.value * 100 / props.maxValue)}%`}
            />

            <div className="notification__content-wrapper">
                <p className="notification__current-action">
                    {props.action}
                </p>
                    
                <p className="notification__filename">
                    {props.filename}
                </p>   
            </div>
        </div>
    );
}
 
export default Notification;