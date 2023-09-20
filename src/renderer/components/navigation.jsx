import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PlayIcon } from './icons/play.svg';
import { ReactComponent as MapIcon } from './icons/map.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { ReactComponent as AccountIcon } from './icons/account.svg';
import { ReactComponent as WikiIcon } from './icons/wiki.svg';
import './navigation.sass';

const Navigation = (props) => {
    const navigate = useNavigate();

    return (
        <nav className="navigation">
            <ul className="navigation__list">
               {props.content.list.map((navigationCategory) => 
                    <li className='navigation__category'>
                        <ul className='navigation__list'>
                            {navigationCategory.map((navigationItem) => {
                                    return (
                                        <li className='navigation__item'>
                                            <button className='navigation__button'>
                                                {navigationItem}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </li>
               )}
            </ul>
        </nav>
    );
}
 
export default Navigation;