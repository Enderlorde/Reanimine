import React from "react";
import { useState } from "react";
import dp_styles from "./directoryPicker.module.css";
import btn_styles from "./button.module.css";

const DirectoryPicker = (props) => {
    let [path, setPath] = useState("none");

    /*    useEffect(()=>{
        props.onPathChange(path);
    },[path]); */

    /*  useEffect(()=>{
        if (props.defaultPath) setPath(props.defaultPath);
        console.log(props.defaultPath);
    },[])
 */
    const getDirectoryPath = () => {
        window.launcherAPI.selectFolder().then((response) => setPath(response));
    };

    return (
        <div className={dp_styles.dp}>
            <input className={dp_styles.path} value={path} readOnly />
            <button
                className={`${btn_styles.button} ${btn_styles.more}`}
                type="button"
                onClick={() => getDirectoryPath()}>
                ...
            </button>
        </div>
    );
};

export default DirectoryPicker;
