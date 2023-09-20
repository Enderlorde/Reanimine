import React from 'react';
import "./feed.sass";

const Feed = (props) => {
    const data = fetch(props.url).then((data) => data);

    return (
        <ul className="feed">
            {data.map((item, index) => {
                <li key={index}>{index}</li>
            })}
        </ul>
    );
}
 
export default Feed;