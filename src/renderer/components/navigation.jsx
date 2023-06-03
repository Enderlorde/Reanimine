import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PlayIcon } from './icons/play.svg';
import { ReactComponent as MapIcon } from './icons/map.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { ReactComponent as AccountIcon } from './icons/account.svg';
import { ReactComponent as WikiIcon } from './icons/wiki.svg';
import './navigation.sass';

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li onClick={() => navigate('/')} title="Play" className="navigation__item banner banner_color-red">
                    <div className="banner__content">
                        <PlayIcon width={25} height={25}/>
                    </div>
                    <div className="banner__shape"></div>
                </li>
                <li onClick={() => navigate('/map')} title="Map" className="navigation__item banner banner_color-purple">
                    <div className="banner__content">
                        <MapIcon width={25} height={25}/>
                    </div>
                    <div className="banner__shape"></div>
                </li>
                <li onClick={() => navigate('/wiki')} title="Wiki" className="navigation__item banner banner_color-blue">
                    <div className="banner__content">
                        <WikiIcon width={25} height={25}/>
                    </div>
                    <div className="banner__shape"></div>
                </li>
                <li onClick={() => navigate('/account')} title="Account" className="navigation__item banner banner_color-yellow">
                    <div className="banner__content">
                        <AccountIcon width={25} height={25}/>
                    </div>
                    <div className="banner__shape"></div>
                </li>
                <li onClick={() => navigate('/settings')} title="Settings" className="navigation__item banner banner_color-green">
                    <div className="banner__content">
                        <SettingsIcon width={25} height={25}/>
                    </div>
                    <div className="banner__shape"></div>
                </li>
            </ul>
        </nav>
    );
}
 
export default Navigation;