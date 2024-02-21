import React from 'react';

import profile_styles from "./profile.module.css";

const Profile = (props) => {
    return (
        <div className={`${profile_styles.profile} ${props.className}`}>
            <div className={profile_styles.avatar}>
                <img className=""/>
            </div>

            <p className={profile_styles.username}>
                My username
            </p>
        </div>
    );
}
 
export default Profile;