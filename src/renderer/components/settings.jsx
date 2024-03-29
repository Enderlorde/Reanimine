import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import DirectoryPicker from './directoryPicker.jsx';
import './settings.sass';
import './form.sass';

const Settings = () => {
    const defaultOptions = {
        root: "./minecraft",
        forge: "./minecraft/Forge.jar",
        memory: {
            min: "0",
            max: "512M"
        },
        window: {
            width: 800,
            height: 600,
            fullscreen: false
        },
    }

    const [avialableRAM, setAvialableRAM] = useState();
    const [options, setOptions] = useState(defaultOptions);
    const [saved, setSaved] = useState(false);

    const getAvailableRAM = async () => {
        const memoryInBytes = await window.something.avialableRAM().then((response) => response);
        const memoryInKBytes = memoryInBytes / 1024;
        const memoryInMBytes = memoryInKBytes / 1024;
        return {
            bytes: memoryInBytes,
            kbytes: memoryInKBytes,
            mbytes: memoryInMBytes
        }
     }

    useEffect(() => {
        if (!avialableRAM) {
            getAvailableRAM().then((response) => setAvialableRAM(response.mbytes))
        }
    });

    useEffect(()=>{
        const localSavedOptions = window.localStorage.getItem("options");
        if(localSavedOptions){
            setOptions(_.merge({...options}, JSON.parse(localSavedOptions)));
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        window.localStorage.setItem("options", JSON.stringify(options));
        window.something.saveOptions(options);
        setSaved(true);
        console.log(options);
    }

    const returnDefault = () => {
        window.localStorage.setItem("options", JSON.stringify(defaultOptions));
        window.something.saveOptions(options);
        console.log(options);
        setOptions({...defaultOptions})
    }

    return (
        <div className="settings">
            <form className="settings__form form" action="" onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="workingDirInput">Path to game</label>
                <DirectoryPicker defaultPath={options.root} onPathChange={(value) => {
                    setSaved(false);

                    setOptions(_.merge({...options}, {
                        root: `${value}/minecraft`,
                        customArgs: [`-javaagent:${value}\\minecraft\\authlib-injector-1.2.2.jar=ely.by`, "-Dauthlibinjector.ignoredPackages=forgewrapper"],
                        forge: `${value}/minecraft/Forge.jar`,
                    } ))}
                }/>

                <label htmlFor="">Min RAM size: {options.memory.min}mb</label>
                <input type="range" max={options.memory.max} 
                defaultValue={options.memory.min} min={0} onChange={(e) =>
                    {
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{memory:{min: e.target.value}})
                        )
                    }
                }/>

                <label htmlFor="">Max RAM size: {options.memory.max}mb</label>
                <input type="range" min={options.memory.min} defaultValue={options.memory.max} max={avialableRAM} onChange={(e) =>
                    {         
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{memory:{max: e.target.value}})
                        )
                    }
                }/>
                
                <label htmlFor="">Game width</label>
                <input className="form__input" disabled={options.window.fullscreen} defaultValue={options.window.width} type="number" onChange={(e) =>
                    { 
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{window:{width: e.target.value}})
                        )
                    }
                }/>

                <label htmlFor="">Game height</label>
                <input className="form__input" disabled={options.window.fullscreen} defaultValue={options.window.height} type="number" onChange={(e) =>
                    { 
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{window:{height: e.target.value}})
                        )
                    }
                }/>

                <label htmlFor="">Fullscreen</label>
                <input checked={options.window.fullscreen} type="checkbox" onChange={(e) =>
                    {
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{window:{fullscreen: e.target.checked}})
                        )
                    }
                }/>

                <button className='form__button' disabled={saved} type="submit">{saved?'Saved':'Save'}</button>
                <button className='form__button' type="submit" onClick={() => returnDefault()}>Reset</button>
            </form>
        </div>
    );
}
 
export default Settings;


