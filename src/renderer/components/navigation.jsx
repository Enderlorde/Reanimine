import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ReactComponent as PlayIcon } from './icons/play.svg';
import { ReactComponent as MapIcon } from './icons/map.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';
import { ReactComponent as AccountIcon } from './icons/account.svg';
import { ReactComponent as WikiIcon } from './icons/wiki.svg';
import './navigation.sass';
import './button.sass';
import button_styles from './button.module.css';

const Navigation = (props) => {
    const navigate = useNavigate();

    return (
        <nav className="navigation">
            <ul className="navigation__list">
               {props.content.list.map((navigationCategory, index) => 
                    <li className='navigation__category' key={index}>
                        <ul className='navigation__list'>
                            {navigationCategory.map((navigationItem, index) => {
                                    return (
                                        <li className='navigation__item' key={index}>
                                           {/*  <button className='navigation__button' onClick={() => navigate(`/${navigationItem.path}`)}>
                                                {navigationItem.name}
                                            </button> */}
                                            <NavLink className={({isActive, isPending}) => isPending?"pending":isActive?`${button_styles.button} ${button_styles.active}}`:button_styles.button} to={`/${navigationItem.path}`} >
                                                {navigationItem.icon} 
                                               
                                                {navigationItem.name.en}
                                            </NavLink>
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