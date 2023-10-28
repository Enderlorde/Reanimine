import React from 'react';
import { GridLoader } from 'react-spinners';
import { useRef,useEffect, useState, Suspense } from 'react';
import {SkinViewer} from 'skinview3d';
import {v4 as uuidv4} from 'uuid';
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

    const [accounts, setAccounts] = useState([
        {
            logo: <MicrosoftLogo/>,
            name: "Microsoft",
            accounts: [
       /*          {
                    username: "My Bedrock Username",
                    info: "my java username",
                    edit: false,
                    id: 0
                } */
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
        },
        {
            logo: <h1>Offline</h1>,
            name: "offline",
            accounts: []
        }
    ])

    const getAuthorization = async () => {
        const authKey = window.mainAPI.getAuthorization("user");
        return await authKey
    }

    const createAccount = (provider) => {
        setAccounts([...accounts],accounts.filter((category) => category.name == provider).map((category) => category.accounts.push({
            username: "username", 
            info: "описание",
            edit: true,
            id: uuidv4()
        })))
        console.log(accounts);
        
    }

    return (
        <ul className="accounts">
            {accounts.map((category, index) => 
            <li className='accounts__category' key={index}>
                {category.logo}

                <ul className="accounts__accounts-list">
                    {category.accounts.map((account, index) => 
                        <li className='account' key={index}>
                            <h2 className='account__username'>{account.username}</h2>

                            <p className='account__info'>{account.info}</p>
                        </li>
                    )}
                    
                    <li>
                        <Button className="accounts__button button button_align-center" onClick={() => createAccount(category.name)}>{`add ${category.name} account`}</Button>
                    </li>
                </ul>
            </li>)}
        </ul>
    );
}
 
export default Account;