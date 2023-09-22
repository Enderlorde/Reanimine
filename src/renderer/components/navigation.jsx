import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
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
                                           {/*  <button className='navigation__button' onClick={() => navigate(`/${navigationItem.path}`)}>
                                                {navigationItem.name}
                                            </button> */}
                                            <NavLink className={({isActive, isPending}) => isPending?"pending":isActive?"navigation__link_active navigation__link ":"navigation__link"} to={`/${navigationItem.path}`} >
                                                <div className="navigation__icon">
                                                    {navigationItem.icon} 
                                                </div>
                                                {navigationItem.name}
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