import React from 'react';
import Feed from './feed';
import "./news.sass";

const News = () => {
    return (
        <div className="news">
            <div className="news__wrapper">
                <div className="news__promo"></div>

                <div className="news__separator">
                    <div className="news__buttonWrapper">
                        {/* <button className="news__button">Play</button> */}
                    </div>
                    
                    <p className='news__username'>My Username</p>
                </div>

                <Feed className="news__feed" link="https://launchercontent.mojang.com/news.json"/>
            </div>
        </div>
    );
}
 
export default News;