import React, { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners';
import { ReactComponent as DownloadIcon } from './icons/download.svg';
import { ReactComponent as DateIcon } from './icons/clock.svg';
import { ReactComponent as EditIcon } from './icons/pencil.svg';
import { ReactComponent as RatingIcon } from './icons/star.svg';
import Button from './button';
import './Mods.sass';
import './backplate.sass';

//thewolfkit
const Mods = () => {
    let [modsList, setModsList] = useState();

    useEffect(() => {
        let modsInfoCache;

        try {
            modsInfoCache = window.sessionStorage.getItem('modsInfo');
        }
        catch {
            modsInfoCache = null;
        }

        if (!modsInfoCache){
            window.modsAPI.modsInfo().then((result) => {
                const mods = JSON.parse(result);
                if (mods) {
                    setModsList([...mods]);
                    window.sessionStorage.setItem('modsInfo', JSON.stringify(mods));
                }
                console.log(mods);
            });
        }else{
            const mods = JSON.parse(modsInfoCache);
            setModsList([...mods]);
        }
        
    },[])

    if (!modsList) 
    return (
        <div className="mods">
            <GridLoader color="#ffffff"/>
        </div>
    )

    return (
        <ul className="backplate">
            {modsList.map((mod, index) => {
                    return (
                        <li key={index} className="backplate__item" >
                            <div>
                                {mod.logo && 
                                    mod.logo.thumbnailUrl &&
                                        <img className="mod__logo "src={mod.logo.thumbnailUrl} alt=""/>
                                }
                            </div>

                            <div className="mod__content">
                                <div className="mod__header">
                                    <h3 className="mod__title" onClick={(e) => e.target.classList.toggle('mod__title_active')}>{mod.name}</h3>

                                    {mod.authors &&
                                        <p className="mod__authors">
                                            {"by " +
                                                mod.authors.map((author) => {
                                                    return author.name}).join(", ")
                                            }
                                        </p>
                                    }
                                </div>

                                <p className="mod__description">{mod.summary}</p>
                                
                                <ul className="mod__statistics statistics">
                                    {mod.downloadCount &&
                                        <li className="statistics__item">
                                            <DownloadIcon width={10} height={10}/>
                                            {mod.downloadCount}
                                        </li>
                                    }
                                    
                                    {mod.dateCreated &&
                                        <li className="statistics__item">
                                            <DateIcon width={10} height={10} />
                                            {new Date(mod.dateCreated).toLocaleDateString("en-US")}
                                        </li>
                                    }

                                    {mod.dateModified &&
                                        <li className="statistics__item">
                                            <EditIcon width={10} height={10} />
                                            {new Date(mod.dateModified).toLocaleDateString("en-US")}
                                        </li>
                                    }

                                    {mod.gamePopularityRank &&
                                        <li className="statistics__item">
                                            <RatingIcon width={10} height={10} />
                                            {mod.gamePopularityRank}
                                        </li>
                                    }
                                </ul>

                                <div className="mod__buttons">

                                </div>
                                {mod.links && 
                                    mod.links.wikiUrl &&
                                        <Button className="button mods__button button_align-center" onClick = {() => window.open(mod.links.wikiUrl,'_blank')}>Wiki</Button>
                                }     
                            </div>    
                        </li>
                    )
                })
            }
        </ul>
    );
}
 
export default Mods;