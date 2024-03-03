import React, { useState } from "react";

import provider_styles from "./provider.module.css";
import backplate_styles from "./backplate.module.css";
import button_styles from "./button.module.css";
import plate_styles from "./plate.module.css";

const Provider = (props) => {
    class Account {
        #accessToken;
        #clientToken;
        constructor(username, description) {
            this.credentials = { username: username, password: "" };
        }

        getAuth() {
            return window.mclcAPI
                .getAuth(JSON.stringify(this.credentials))
                .then((authObject) => {
                    this.#accessToken = authObject.access_token;
                    this.#clientToken = authObject.client_token;
                });
        }

        get accessToken() {
            return this.#accessToken;
        }
    }

    const [editMode, setEditMode] = useState(false);

    const switchEditor = () => {
        setEditMode(!editMode);
    };

    const logIn = (form) => {
        const data = Object.fromEntries(new FormData(form));
        let account = new Account(data.username, data.password);
        account.getAuth().then(() => console.log(account.accessToken));
    };

    return (
        <div className={provider_styles.provider}>
            <div className={provider_styles.logo}>
                {props.provider.logo}

                {props.provider.name}
            </div>

            <div
                className={`${provider_styles.backplate} ${backplate_styles.backplate}`}>
                {props.provider?.accounts?.length > 0 && (
                    <ul
                        className={`${provider_styles.accounts} ${plate_styles.plate}`}>
                        {props.provider.accounts?.map((account, index) => {
                            return (
                                //Элемент аккаунта
                                <li
                                    key={index}
                                    className={`${provider_styles.account} ${plate_styles.element}`}>
                                    <div className={provider_styles.content}>
                                        <p
                                            className={`${provider_styles.username} ${account.active ? provider_styles.active : ""}`}>
                                            {account.username}
                                        </p>

                                        <p
                                            className={
                                                provider_styles.description
                                            }>
                                            {account.description}
                                        </p>
                                    </div>

                                    <button
                                        className={`${button_styles.button} ${button_styles.more}`}></button>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        logIn(e.target);
                    }}
                    className={`${provider_styles.editor} ${backplate_styles.backplate} ${editMode ? provider_styles.editor_active : ""}`}>
                    <label
                        htmlFor=""
                        className={`${provider_styles.input} ${plate_styles.element}`}>
                        Username
                        <input type="text" name="username" id="" />
                    </label>
                    {props.provider.name != "offline" && (
                        <label
                            htmlFor=""
                            className={`${provider_styles.input} ${plate_styles.element}`}>
                            password
                            <input type="password" name="password" id="" />
                        </label>
                    )}
                    <button
                        type="submit"
                        className={`${button_styles.button} ${button_styles.color_green} ${button_styles.align_center}`}>
                        Log in
                    </button>
                </form>

                <button
                    onClick={() => switchEditor()}
                    className={`${button_styles.button} ${button_styles.align_center}`}>
                    Add {props.provider.name} account
                </button>
            </div>
        </div>
    );
};

export default Provider;
