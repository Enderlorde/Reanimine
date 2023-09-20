import React from 'react';

import "./accountWidget.sass";

const AccountWidget = (props) => {
    return (
        <div className={props.className?props.className:"accountWidget"}>
            <div className="accountWidget__avatar">
                <img className=""/>
            </div>

            <p className="accountWidget__name">
                My username
            </p>
        </div>
    );
}
 
export default AccountWidget;