import React from 'react';
import Feed from './feed';
import "./news.sass";

const News = () => {
    return (
        <div className="news">
            <Feed className="news__feed" link="https://launchercontent.mojang.com/news.json"/>
        </div>
    );
}
 
export default News;