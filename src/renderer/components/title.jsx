import React, { useState } from "react";
import { motion } from "framer-motion";

import title_styles from "./title.module.css";
import Arrow from "./icons/arrow.svg?react";

const Title = (props) => {
    const [state, setState] = useState(false);

    const switchState = () => setState(!state);

    if (!props.content) return <div className="dropdown"></div>;

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
        closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            initial={false}
            animate={state ? "open" : "closed"}
            className={`${title_styles.title} ${props.className} ${state ? title_styles.title_active : ""}`}>
            <div className={title_styles.header} onClick={() => switchState()}>
                {props.content.header && <p>{props.content.header.en}</p>}

                <Arrow className={title_styles.arrow} />
            </div>

            {props.content.list && (
                <motion.ul
                    variants={{
                        open: {
                            clipPath: "inset(0 0 0 0)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.2,
                                delayChildren: 0.3,
                                staggerChildren: 0.05,
                            },
                        },
                        closed: {
                            clipPath: "inset(0 0 100% 0)",
                            transition: {
                                type: "spring",
                                bounce: 0,
                                duration: 0.2,
                            },
                        },
                    }}
                    className={`${title_styles.dropdown}`}>
                    {props.content.list.map((listData, index) => (
                        <motion.li
                            variants={itemVariants}
                            className={title_styles.item}
                            key={index}
                            onClick={() => listData.function()}>
                            {listData.text.en}
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </motion.div>
    );
};

export default Title;
