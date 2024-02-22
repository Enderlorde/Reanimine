import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import accounts_styles from './accounts.module.css';
import button_styles from './button.module.css';
import plate_styles from './plate.module.css';
import backplate_styles from './backplate.module.css';

const Accounts = () => {
    const [providers, setProviders] = useState([
        {
            name: "Microsoft",
            accounts: [
                {
                    username: "My Bedrock Username",
                    description: "my bedrok username",
                    edit: false,
                    id: 0,
                    active: true
                },
                {
                    username: "My Java Username",
                    description: "my java username",
                    edit: false,
                    id: 1,
                    active: false
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
        <ul className={accounts_styles.wrapper}>
            {providers.map((provider, index) => { return (
                <li key={index} className={accounts_styles.provider}>
                    <div className={accounts_styles.logo}>
                        {provider.logoImage}

                        {provider.name}
                    </div>
                    
                    <div className={`${accounts_styles.backplate} ${backplate_styles.backplate}`}>
                        <ul className={`${accounts_styles.accounts} ${plate_styles.plate}`}>
                            {provider.accounts.map((account, index) => { return(
                                //Элемент аккаунта
                                <li key={index} className={`${accounts_styles.account} ${plate_styles.element}`}>
                                    <div className={accounts_styles.content}>
                                        <p className={`${accounts_styles.username} ${account.active?accounts_styles.active:''}`}>{account.username}</p>
                                        
                                        <p className={accounts_styles.description}>{account.description}</p>
                                    </div>
                                    
                                    <button className={`${button_styles.button} ${button_styles.more}`}></button>
                                </li>
                            )})}

                            
                        </ul>

                        <button className={`${button_styles.button} ${button_styles.align_center}`}>Add {provider.name} account</button>
                    </div>
                </li>
            )})}
        </ul>
    );
}
 
export default Accounts;