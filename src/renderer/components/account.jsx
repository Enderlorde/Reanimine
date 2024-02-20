import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import account_style from './account.module.css';
import button_style from './button.module.css';

const Account = () => {
    const [providers, setProviders] = useState([
        {
            name: "Microsoft",
            accounts: [
                {
                    username: "My Bedrock Username",
                    info: "my java username",
                    edit: false,
                    id: 0
                } 
            ]
        },
        {
            name: "Mojang",
            accounts: []
        },
        {
            name: "Ely.by",
            accounts: []
        },
        {
            name: "offline",
            accounts: []
        }
    ])

    return (
        <ul className={account_style.wrapper}>
            {providers.map((provider, index) => { return (
                <li key={index} className={account_style.provider}>
                    <div className={account_style.logo}>
                        {provider.logoImage}

                        {provider.name}
                    </div>

                    <ul className={account_style.accounts}>
                        {provider.accounts.map((account, index) => { return(
                            <li key={index} className={account_style.account}>
                                {account.username}
                            </li>
                        )})}

                        <button className={button_style.button}>Add {provider.name} account</button>
                    </ul>
                </li>
            )})}
        </ul>
    );
}
 
export default Account;