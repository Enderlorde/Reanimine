import React, { Suspense } from 'react';
import { CircleLoader }	from 'react-spinners';
//import Feed from './feed';
const Feed = React.lazy(() => import("./feed.jsx"));
import "./news.sass";

const News = () => {
    return (
        <div className="news">
            <div className="news__wrapper">
                <div className="news__promo"></div>

                <div className="news__separator">
                    <div className="news__buttonWrapper">
                        <button className="news__button">Play</button>
                    </div>
                    
                    <p className='news__username'>My Username</p>
                </div>

                <Suspense fallback={<CircleLoader />}>
                    <Feed className="news__feed" url="https://launchercontent.mojang.com/javaPatchNotes.json"/>
                </Suspense>
            </div>
        </div>
    );
}
 
export default News;