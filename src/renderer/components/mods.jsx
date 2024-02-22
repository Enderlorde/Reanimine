import React, { useEffect, useState, Laz } from 'react';
import { GridLoader, BounceLoader } from 'react-spinners';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactComponent as DownloadIcon } from './icons/download.svg';
import { ReactComponent as DateIcon } from './icons/clock.svg';
import { ReactComponent as EditIcon } from './icons/pencil.svg';
import { ReactComponent as RatingIcon } from './icons/star.svg';
import button_styles from './button.module.css';
import mods_styles from './mods.module.css';
import backplate_styles from './backplate.module.css';
import plate_styles from './plate.module.css';


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
        <ul className={`${mods_styles.mods}`}>
            {
                modsList.map((mod, index) => <li className={`${mods_styles.mod} ${backplate_styles.backplate}`} key={index}>
                    {mod.logo && 
                        mod.logo.thumbnailUrl &&
                            <div className={`${mods_styles.illustration}`}>
                                <LazyLoadImage
                                className={`${mods_styles.img}`}
                                alt={mod.name}
                                placeholder={<BounceLoader />}
                                src={mod.logo.thumbnailUrl}/>
                            </div>
                    }

                    <div className={`${mods_styles.contentWrapper} ${plate_styles.plate}`}>
                        <div className={`${mods_styles.headline} ${plate_styles.element}`}>
                            <h2 className={`${mods_styles.title}`}>{mod.name}</h2>
                            <span className={`${mods_styles.version}`}><DateIcon width={10} height={10} />
                                            {new Date(mod.dateCreated).toLocaleDateString("en-US")}</span>
                        </div>

                        {mod.summary &&
                            <div className={`${mods_styles.content} ${plate_styles.element}`}>
                                {mod.summary.slice(0, 100)}
                                {mod.links && 
                                    mod.links.wikiUrl &&
                                        <button className={`${button_styles.button} ${button_styles.align_center}`} onClick = {() => window.open(mod.links.wikiUrl,'_blank')}>Wiki</button>
                                }                                
                            </div>
                        }
                    </div>
                </li>)
            }
        </ul>
      /*   <ul className={`${mods_styles.mods}`}>
            {modsList.map((mod, index) => {
                    return (
                        <li key={index} className={`${backplate_styles.backplate} ${mods_styles.mod}`}>
                            {mod.logo && 
                                mod.logo.thumbnailUrl &&
                                    <img className={`${mods_styles.logo}`} src={mod.logo.thumbnailUrl} alt=""/>
                            }

                            <div className={`${mods_styles.content}`}>
                                <div className={`${mods_styles.header}`}>
                                    <h3 className={`${mods_styles.title}`} onClick={(e) => e.target.classList.toggle('mod__title_active')}>{mod.name}</h3>

                                    {mod.authors &&
                                        <p className={`${mods_styles.authors}`}>
                                            {"by " +
                                                mod.authors.map((author) => {
                                                    return author.name}).join(", ")
                                            }
                                        </p>
                                    }
                                </div>

                                <p className={`${mods_styles.description}`}>{mod.summary}</p>
                                
                                <ul className={`${mods_styles.statistic}`}>
                                    {mod.downloadCount &&
                                        <li className={`${mods_styles.item}`}>
                                            <DownloadIcon width={10} height={10}/>
                                            {mod.downloadCount}
                                        </li>
                                    }
                                    
                                    {mod.dateCreated &&
                                        <li className={`${mods_styles.item}`}>
                                            <DateIcon width={10} height={10} />
                                            {new Date(mod.dateCreated).toLocaleDateString("en-US")}
                                        </li>
                                    }

                                    {mod.dateModified &&
                                        <li className={`${mods_styles.item}`}>
                                            <EditIcon width={10} height={10} />
                                            {new Date(mod.dateModified).toLocaleDateString("en-US")}
                                        </li>
                                    }

                                    {mod.gamePopularityRank &&
                                        <li className={`${mods_styles.item}`}>
                                            <RatingIcon width={10} height={10} />
                                            {mod.gamePopularityRank}
                                        </li>
                                    }
                                </ul>
                                {mod.links && 
                                    mod.links.wikiUrl &&
                                        <button className={`${button_styles.button}`} onClick = {() => window.open(mod.links.wikiUrl,'_blank')}>Wiki</button>
                                }     
                            </div>    
                        </li>
                    )
                })
            }
        </ul> */
    );
}
 
export default Mods;