import React, { useEffect, useState } from 'react';
import { stripHtml } from 'string-strip-html';
import "./feed.sass";

const Feed = (props) => {
    //const data = fetch(props.url).then((data) => data);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(props.link).then((response) => response.json()).then((content) => {
            /* const redusedNews = []
            for (var i = 0; i < 4; i++){
                redusedNews.push(content.entries[i]);
            }
            setData(redusedNews); */
            setData(content.entries)
        })
        
    },[])

    useEffect(() => {
        console.log(data);
    },[data])

    return (
        <ul className={props.className?`${props.className} feed`:"feed"}>
            {
                data.map((item, index) => <li className='feed__item' key={index}>
                    <div className="feed__img">
                        <img src={"https://launchercontent.mojang.com"+item.playPageImage.url} alt={item.playPageImage.title}/>
                    </div>
                    <div className="feed__contentWrapper">
                        <div className="feed__headline">
                            <h2 className="feed__title">{item.title}</h2>
                            <span className="feed__version">{item.date}</span>
                        </div>
                        <div className="feed__content">
                            {stripHtml(item.text).result.slice(0, 100)}
                        </div>
                    </div>
                </li>)
            }
        </ul>
    );
}
 
export default Feed;