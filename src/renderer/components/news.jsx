import React from 'react';
import Feed from './feed';
import news_styles from "./news.module.css";

const News = () => {
    return (
        <div className={news_styles.news}>
            <Feed link="https://launchercontent.mojang.com/news.json" size={100}/>
        </div>
    );
}
 
export default News;