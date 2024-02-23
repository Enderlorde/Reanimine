import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import {ReactComponent as MojangLogo} from '../static/mojang.svg';
import {ReactComponent as MicrosoftLogo} from '../static/microsoft.svg';
import {ReactComponent as OfflineLogo} from '../static/offline.svg';
import accounts_styles from './accounts.module.css';
import button_styles from './button.module.css';
import plate_styles from './plate.module.css';
import backplate_styles from './backplate.module.css';
import message_styles from './message.module.css';

const Accounts = () => {
    const [providers, setProviders] = useState([
        {
            logo: <MicrosoftLogo width={21} height={21}/>,
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
            logo: <MojangLogo width={21} height={21}/>,
            accounts: []
        },
        {
            name: "Ely.by",
            accounts: []
        },
        {
            logo: <OfflineLogo width={21} height={21}/>,
            name: "offline",
            accounts: []
        }
    ])

    return (
        <div className={accounts_styles.wrapper}>
            <ul className={accounts_styles.providers}>
                {providers.map((provider, index) => { return (
                    <li key={index} className={accounts_styles.provider}>
                        <div className={accounts_styles.logo}>
                            {provider.logo}

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

            <div className={accounts_styles.settings}>
                <div className={message_styles.message}>
                    Trying to log in with Mojang account? You may need to migrate to a Microsoft account to log in. Get started.
                </div>
            </div>

            <hr className={accounts_styles.line}/>

            <div className={accounts_styles.settings}>
                <div className={message_styles.message}>
                    Options intended for troubleshooting accounts. Use with caution
                </div>

                <div className={`${backplate_styles.backplate} ${accounts_styles.backplate}`}>
                    <button className={`${button_styles.button} ${button_styles.align_center}`}>clean up cashed account tokens</button>
                </div>
            </div>
        </div>
    );
}
 
export default Accounts;