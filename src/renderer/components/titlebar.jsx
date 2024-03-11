import React from "react";
import Toolbox from "./toolbox.jsx";
import Title from "./title";

import titlebar_styles from "./titlebar.module.css";

const TitleBar = (props) => {
    return (
        <div className={titlebar_styles.titlebar}>
            <Title className={titlebar_styles.title} content={props.menu} />
            <Toolbox className={titlebar_styles.toolbox} />
        </div>
    );
};

export default TitleBar;
