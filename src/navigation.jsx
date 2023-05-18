import React from 'react';
import './navigation.sass';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item banner banner_color-blue">
                    <div className="banner__content">
                        M
                    </div>
                    <div className="banner__shape"></div>
                </li>
                <li className="navigation__item banner banner_color-yellow">
                    <div className="banner__content">
                        S
                    </div>
                    <div className="banner__shape"></div>
                </li>
                <li className="navigation__item banner banner_color-purple">
                    <div className="banner__content">
                        A
                    </div>
                    <div className="banner__shape"></div>
                </li>
                <li className="navigation__item banner banner_color-green">
                    <div className="banner__content">
                        S
                    </div>
                    <div className="banner__shape"></div>
                </li>
            </ul>
        </nav>
    );
}
 
export default Navigation;