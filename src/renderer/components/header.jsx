import React from 'react';
import Toolbox from './toolbox.jsx';
import { ReactComponent as Logo } from './icons/logo.svg';

import './header.sass';

const Header = (props) => {
    return (
        <div className="header">
            <Logo width={30} height={30}/>
            <p>{props.title}</p>
            <Toolbox className='toolbox header__toolbox'/>
        </div>
    );
}
 
export default Header;

//<a target="_blank" href="https://icons8.com/icon/16462/minecraft-logo">Minecraft Logo</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>