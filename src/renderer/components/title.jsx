import React, { useState } from 'react';
import title_styles from "./title.module.css";
import {ReactComponent as Arrow} from "./icons/arrow.svg";

const Title = (props) => {
    const [state, setState] = useState(false);

    const switchState = () => setState(!state);

    if(!props.content) return (
        <div className="dropdown">
            
        </div>
    )

    return (
        <div className={`${title_styles.title} ${props.className} ${state?title_styles.title_active:""}`}>
            <div className={title_styles.header} onClick={() => switchState()}>
                {props.content.header &&
                    <p>{props.content.header.en}</p>
                }
                
                <Arrow  className={title_styles.arrow}/>
            </div>
            
            {props.content.list &&
                <ul className={`${title_styles.dropdown}`}>
                    {props.content.list.map((listData, index) =>
                        <li className={title_styles.item} key={index} onClick={() => listData.function()}>{listData.text.en}</li>
                    )}
                </ul>
            }
        </div>
    );
}
 
export default Title;