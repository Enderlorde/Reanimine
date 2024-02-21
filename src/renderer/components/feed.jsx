import React, { useEffect, useState } from 'react';
import { stripHtml } from 'string-strip-html';
import { GridLoader } from 'react-spinners';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import feed_styles from "./feed.module.css";
import plate_styles from './plate.module.css';
import backplate_styles from './backplate.module.css';


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
        <GridLoader color={"#fff"}/>
    </div>
    )

    return (
        <ul className={`${feed_styles.feed} ${props.className}`}>
            {
                data.map((item, index) => <li className={`${feed_styles.item} ${backplate_styles.backplate}`} key={index}>
                    {item.playPageImage &&
                        <div className={`${feed_styles.img}`}>
                            <LazyLoadImage
                            alt={item.playPageImage.title}
                            placeholder={<span>BOOP</span>}
                            src={"https://launchercontent.mojang.com"+item.playPageImage.url}/>
                            {/* <img loading='lazy' src={"https://launchercontent.mojang.com"+item.playPageImage.url} alt={item.playPageImage.title}/> */}
                        </div>
                    }

                    {item.image &&
                        <div className={`${feed_styles.img}`}>
                            <LazyLoadImage
                            alt={item.image.title}
                            placeholder={<span>BOOP</span>}
                            src={"https://launchercontent.mojang.com"+item.image.url}/>
                            {/* <img loading='lazy' src={"https://launchercontent.mojang.com"+item.image.url} alt={item.image.title}/> */}
                        </div>
                    }

                    <div className={`${feed_styles.contentWrapper} ${plate_styles.plate}`}>
                        <div className={`${feed_styles.headline} ${plate_styles.element}`}>
                            <h2 className={`${feed_styles.title}`}>{item.title}</h2>
                            <span className={`${feed_styles.version}`}>{item.date}{item.version}</span>
                        </div>

                        {item.text &&
                            <div className={`${feed_styles.content} ${plate_styles.element}`}>
                                {stripHtml(item.text.slice(0, 100)).result}
                            </div>
                        }

                        {item.body &&
                            <div className={`${feed_styles.content} ${plate_styles.element}`}>
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