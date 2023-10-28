import React from 'react';
import "./dropdown.sass";
import {ReactComponent as Arrow} from "./icons/arrow.svg";

const Dropdown = (props) => {
    if(!props.content) return (
        <div className="dropdown">
            
        </div>
    )

    return (
        <div className={props.className?props.className:"dropdown"}>
            <div className='dropdown__header'>
                {props.content.header &&
                    <p>{props.content.header.ru}</p>
                }
                
                <Arrow  className="dropdown__arrow"/>
            </div>
            
            {props.content.list &&
                <ul className={"dropdown__list"}>
                    {props.content.list.map((listData, index) =>
                        <li className='dropdown__item' key={index} onClick={() => listData.function()}>{listData.text.ru}</li>
                    )}
                </ul>
            }
        </div>
    );
}
 
export default Dropdown;