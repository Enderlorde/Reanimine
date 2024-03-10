import React, { useRef, useState } from "react";
import Provider from "./provider";
import accounts_styles from "./accounts.module.css";
import button_styles from "./button.module.css";
import backplate_styles from "./backplate.module.css";
import message_styles from "./message.module.css";

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
                    active: true,
                },
                {
                    username: "My Java Username",
                    description: "my java username",
                    edit: false,
                    id: 1,
                    active: false,
                },
            ],
        },
        {
            name: "Mojang",

            accounts: [],
        },
        {
            name: "Ely.by",
            accounts: [],
        },
        {
            name: "offline",
            accounts: [],
        },
    ]);

    const testRef = useRef(null);

    return (
        <div className={accounts_styles.wrapper}>
            <ul className={accounts_styles.providers}>
                {providers.map((provider, index) => {
                    return (
                        <li key={index} className={accounts_styles.provider}>
                            <Provider provider={provider}></Provider>
                        </li>
                    );
                })}
            </ul>

            <div className={accounts_styles.settings}>
                <div className={message_styles.message}>
                    Trying to log in with Mojang account? You may need to
                    migrate to a Microsoft account to log in. Get started.
                </div>
            </div>

            <hr className={accounts_styles.line} />

            <div className={accounts_styles.settings}>
                <div className={message_styles.message}>
                    Options intended for troubleshooting accounts. Use with
                    caution
                </div>

                <div
                    className={`${backplate_styles.backplate} ${accounts_styles.backplate}`}>
                    <button
                        className={`${button_styles.button} ${button_styles.align_center}`}>
                        clean up cashed account tokens
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
