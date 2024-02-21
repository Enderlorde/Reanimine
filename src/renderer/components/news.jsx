import React from 'react';
import Feed from './feed';
import "./news.sass";

const News = () => {
    return (
        <div className="news">
            <Feed link="https://launchercontent.mojang.com/news.json" size={100}/>
        </div>
    );
}
 
export default News;