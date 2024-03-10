import React from "react";
import { NavLink } from "react-router-dom";
import navigation_styles from "./navigation.module.css";
import button_styles from "./button.module.css";
import backplate_styles from "./backplate.module.css";
import plate_styles from "./plate.module.css";

const Navigation = (props) => {
    return (
        <nav
            className={`${navigation_styles.navigation} ${backplate_styles.backplate}`}>
            <ul className={`${navigation_styles.list} ${plate_styles.plate}`}>
                {
                    // eslint-disable-next-line react/prop-types
                    props.content.list.map((navigationCategory, index) => (
                        <li
                            className={`${navigation_styles.category} ${plate_styles.element}`}
                            key={index}>
                            <ul className={`${navigation_styles.list}`}>
                                {navigationCategory.map(
                                    (navigationItem, index) => {
                                        return (
                                            <li
                                                className={`${navigation_styles.item}`}
                                                key={index}>
                                                <NavLink
                                                    // eslint-disable-next-line react/prop-types
                                                    className={({
                                                        isActive,
                                                        isPending,
                                                    }) =>
                                                        `${button_styles.button} ${navigationItem.classes?.map((clas) => button_styles[clas]).join(" ")} ${isActive ? button_styles.active : ""}`
                                                    }
                                                    to={`/${navigationItem.path}`}>
                                                    {navigationItem.icon}

                                                    {navigationItem.name.en}
                                                </NavLink>
                                            </li>
                                        );
                                    },
                                )}
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default Navigation;
