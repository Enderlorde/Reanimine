import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { motion } from "framer-motion";

import dd_styles from "./dropdown.module.css";

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: "-100%", transition: { duration: 1 } },
};

const slideFromSide = {
    open: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, x: "-100%", transition: { duration: 0.02 } },
};

const Dropdown = (props) => {
    const [current, setCurrent] = useState(props.content?.[0]);
    const [state, setState] = useState(false);

    const handleChange = (index) => {
        setCurrent(props.content[index]);
        setState(false);
    };

    const switchState = () => {
        setState(!state);
    };

    return (
        <motion.div
            className={`${dd_styles.dd} ${props.type == "mini" ? dd_styles.size_mini : ""}`}
            initial={false}
            animate={state ? "open" : "closed"}>
            <div className={dd_styles.item} onClick={() => switchState()}>
                {current?.text}
            </div>
            <motion.ul
                className={`${dd_styles.list} ${state ? dd_styles.active : ""}`}
                variants={{
                    open: {
                        display: "flex",
                        transition: {
                            staggerChildren: props.type == "mini" ? 0 : 0.5,
                        },
                    },
                    closed: {
                        display: "none",
                    },
                }}>
                {props.content?.map((item, index) => (
                    <motion.li
                        variants={
                            props.type == "mini" ? slideFromSide : itemVariants
                        }
                        key={item.value}
                        className={dd_styles.item}
                        onClick={() => handleChange(index)}>
                        {item.text}
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};

Dropdown.propTypes = {
    type: PropTypes.string,
    content: PropTypes.array.isRequired,
};

export default Dropdown;
