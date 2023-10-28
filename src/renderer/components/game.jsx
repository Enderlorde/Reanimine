import React, { useEffect, useState } from 'react';
import {ReactComponent as PromoImage} from '../static/game_background.svg';
import Feed from './feed';
import Button from './button';
import Dropdown from './dropdown';
import DownloadInfo from './downloadInfo';
import './game.sass';

const Game = (props) => {
    const [versions, setVersions] = useState([]);
    const [currentVersion, setCurrentVersion] = useState("");
    const [filter, setFilter] = useState("release old_beta old_alpha");
    const [runProgress, setRunProgress] = useState({});
    const [readyState, setReadyState] = useState(true)
    const [popupState, setPopupState] = useState(false);

    useEffect(() => {
        fetch("https://piston-meta.mojang.com/mc/game/version_manifest.json").then((response) => response.json()).then((manifest) =>  {
            setVersions(manifest.versions.filter((versionObj) => filter.includes(versionObj.type)).map((versionObj) => {
                return {
                    text: {ru:`${versionObj.id}`},
                    function: () => setCurrentVersion(versionObj.id)
                }  
            }))
        })

        setCurrentVersion(window.localStorage.getItem('JE_current_version'));

        window.mainAPI.clearListeners('runProgress');
        window.mainAPI.clearListeners('closing');
        window.mainAPI.clearListeners('childProcess');

        window.mainAPI.handleRunProgress((event, progressJSON) => {
            let progress = JSON.parse(progressJSON);
            setPopupState(true);
            setReadyState(false)
            setRunProgress({...progress});
            console.log(progress);
        });
    
        window.mainAPI.handleClosing((event, code) => {setPopupState(false); setReadyState(true); console.log(`Closed with code ${code}`);})    

        window.mainAPI.handleChildProcess((event, process) => setPopupState(false));
    },[])   

    useEffect(() => {
        window.localStorage.setItem('JE_current_version', currentVersion)
    },[currentVersion])

    const getAuthorization = async () => {
        const authKey = window.mainAPI.getAuthorization("user");
        return await authKey
    }

    const runGame = () => {
        console.log("running....");

        let options = {
            root: `./clients/${currentVersion}`,
            version: {
                number: currentVersion,
                type: "release"
            },
            memory: {
                max: "6G",
                min: "4G"
            }
        }

        getAuthorization().then((authKey) => window.mainAPI.runGame(JSON.stringify(options), JSON.stringify(authKey)))
        
    }

    return (
        <div className="game">
            <DownloadInfo className="game__downloadInfo" enabled={popupState}  action={runProgress["name"]?"Скачиваем":"Загружаем"} filename={runProgress['type']} value={runProgress['task']?runProgress['task']:runProgress['current']} maxValue={runProgress['total']}/>

            <PromoImage className="game__promo"/>

            <div className="game__separator separator">
                <Button className="separator__play-button button button_type-play" enabled={readyState} onClick={() => runGame()}>Play</Button>

                <div className="separator__game-version-widget">
                    <p>Текущая версия:</p> 
                    <Dropdown content={{
                        header: {en:currentVersion,ru:currentVersion},
                        list: versions
                    }}/>
                </div>
            </div>

            <Feed className="game__feed" link="https://launchercontent.mojang.com/javaPatchNotes.json" size={50} />

            <div className='game__requirements-wrapper'>
                <div className="game__requirements">
                    <h2>System requirements</h2>
                    <table className="">
                        <thead>
                            <tr>
                                <td></td>
                                
                                <td>
                                    <span>Minimum Requirements</span>
                                </td>

                                <td>
                                    <span>Recommended Requirements</span>
                                </td>
                            </tr> 
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <span>Operation System</span>
                                </td>

                                <td>
                                    <span>{props.requirements.os.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.os.rec}</span>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <span>Architecture</span>
                                </td>

                                <td>
                                    <span>{props.requirements.arch.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.arch.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Memory</span>
                                </td>

                                <td>
                                    <span>{props.requirements.ram.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.ram.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Motion Controller</span>

                                </td>

                                <td>
                                    <span>{props.requirements.motion.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.motion.rec}</span>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <span>Headset</span>
                                </td>

                                <td>
                                    <span>{props.requirements.headset.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.headset.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Processor</span>
                                </td>

                                <td>
                                    <span>{props.requirements.cpu.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.cpu.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Graphics</span>
                                </td>

                                <td>
                                    <span>{props.requirements.gpu.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.gpu.rec}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
 
export default Game;