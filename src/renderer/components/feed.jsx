import React, { useEffect, useState } from 'react';
import { stripHtml } from 'string-strip-html';
import { GridLoader } from 'react-spinners';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import "./feed.sass";


const Feed = (props) => {
    //const data = fetch(props.url).then((data) => data);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(props.link).then((response) => response.json()).then((content) => {
            let entries = content.entries
            if (props.size) entries = content.entries.slice(0, props.size)
            setData(entries)
        })
        
    },[])

    useEffect(() => {
        console.log(data);
    },[data])

    if (data.length <= 0) return (
    <div className='feed'>
        <GridLoader className="feed__spinner" color={"#fff"}/>
    </div>
    )

    return (
        <ul className={props.className?`${props.className} feed`:"feed"}>
            {
                data.map((item, index) => <li className='feed__item' key={index}>
                    {item.playPageImage &&
                        <div className="feed__img">
                            <LazyLoadImage
                            alt={item.playPageImage.title}
                            placeholder={<span>BOOP</span>}
                            src={"https://launchercontent.mojang.com"+item.playPageImage.url}/>
                            {/* <img loading='lazy' src={"https://launchercontent.mojang.com"+item.playPageImage.url} alt={item.playPageImage.title}/> */}
                        </div>
                    }

                    {item.image &&
                        <div className="feed__img">
                            <LazyLoadImage
                            alt={item.image.title}
                            placeholder={<span>BOOP</span>}
                            src={"https://launchercontent.mojang.com"+item.image.url}/>
                            {/* <img loading='lazy' src={"https://launchercontent.mojang.com"+item.image.url} alt={item.image.title}/> */}
                        </div>
                    }

                    <div className="feed__contentWrapper">
                        <div className="feed__headline">
                            <h2 className="feed__title">{item.title}</h2>
                            <span className="feed__version">{item.date}{item.version}</span>
                        </div>

                        {item.text &&
                            <div className="feed__content">
                                {stripHtml(item.text.slice(0, 100)).result}
                            </div>
                        }

                        {item.body &&
                            <div className="feed__content">
                                {stripHtml(item.body.slice(0, 100)).result}
                            </div>
                        }
                        
                    </div>
                </li>)
            }
        </ul>
    );
}
 
export default Feed;