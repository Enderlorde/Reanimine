import React from 'react';

import profileWidget_styles from "./profileWidget.module.css";

const Profile = (props) => {
    return (
        <div className={`${profileWidget_styles.profile} ${props.className}`}>
            <div className={profileWidget_styles.avatar}>
                <img className=""/>
            </div>

            <p className={profileWidget_styles.username}>
                My username
            </p>
        </div>
    );
}
 
export default Profile;