import React from 'react';
import { NavLink } from 'react-router-dom';
import navigation_styles from './navigation.module.css';
import button_styles from './button.module.css';
import backplate_styles from './backplate.module.css';
import plate_styles from './plate.module.css';

const Navigation = (props) => {
    return (
        <nav className={`${navigation_styles.navigation} ${backplate_styles.backplate}`}>
            <ul className={`${navigation_styles.list} ${plate_styles.plate}`}>
               {props.content.list.map((navigationCategory, index) => 
                    <li className={`${navigation_styles.category} ${plate_styles.element}`} key={index}>
                        <ul className={`${navigation_styles.list} `}>
                            {navigationCategory.map((navigationItem, index) => {
                                    return (
                                        <li className={`${navigation_styles.item}`} key={index}>
                                            <NavLink className={({isActive, isPending}) => isPending?"pending":isActive?`${button_styles.button} ${button_styles.active}`:button_styles.button} to={`/${navigationItem.path}`} >
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