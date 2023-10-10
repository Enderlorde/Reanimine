import React from 'react';
import { GridLoader } from 'react-spinners';
import { useRef,useEffect, useState, Suspense } from 'react';
import {SkinViewer} from 'skinview3d';
import {ReactComponent as MicrosoftLogo} from "../static/Microsoft Logo.svg";
import {ReactComponent as MojangLogo} from "../static/Mojang Studio Logo.svg";
import Button from './button';

import './account.sass';

const Account = () => {
 /*    const viewport = useRef();
    const [mode, setMode] = useState('offline');

    useEffect(() => {

        const mode = window.sessionStorage.getItem('mode');

        if (mode) setMode(mode);
    },[]);

    useEffect(() => {
        const nickname = window.localStorage.getItem('nickname');

        if(nickname && mode == 'Online'){
            new SkinViewer({
                canvas: viewport.current,
                width: 240,
                height: 320,
                skin: `http://skinsystem.ely.by/skins/${nickname}`,
            });
        }
    },[mode])

    console.log(mode); */

    const testAccounts = [
        {
            logo: <MicrosoftLogo/>,
            name: "Microsoft",
            accounts: [
                {
                    username: "My Bedrock Username",
                    info: "my java username"
                }
            ]
        },
        {
            logo: <MojangLogo/>,
            name: "Mojang",
            accounts: []
        },
        {
            logo: <h1>Ely.by</h1>,
            name: "Ely.by",
            accounts: []
        }
    ]

    return (
        <ul className="accounts">
            {testAccounts.map((category) => <li className='accounts__category'>
                {category.logo}
                <ul className="accounts__accounts-list">
                    {category.accounts.map((account) => <li className='account'>
                        <h2 className='account__username'>{account.username}</h2>

                        <p className='account__info'>{account.info}</p>
                    </li>)}

                    <li>
                        <Button className="accounts__button button button_align-center">{`add ${category.name} account`}</Button>
                    </li>
                </ul>

                
            </li>)}
        </ul>
    );
}
 
export default Account;