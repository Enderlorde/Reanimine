import React from 'react';
import "./dropdown.sass";
import {ReactComponent as Arrow} from "./icons/arrow.svg";

const Dropdown = (props) => {
    return (
        <div className={props.className?props.className:"dropdown"}>
            <p className='dropdown__header'>{props.content.header}<Arrow  className="dropdown__arrow"/></p>

            <ul className={"dropdown__list"}>
                {props.content.list.map((listData) =>
                    <li className='dropdown__item'>{listData}</li>
                )}
            </ul>
        </div>
    );
}
 
export default Dropdown;