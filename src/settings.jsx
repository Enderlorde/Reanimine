import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import Button from './button.jsx';
import DirectoryPicker from './directoryPicker.jsx';
import './settings.sass';

const Settings = () => {
    const [avialableRAM, setAvialableRAM] = useState();
    const [options, setOptions] = useState({
        root: '',
        memory: {
            min: 1024,
            max: 2048
        },
        window: {
            width: 800,
            height: 600,
            fullscreen: false
        }
    });

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
    }

    return (
        <div className="settings">
            <form className="settings__form form" action="" onSubmit={(e) => submitHandler(e)}>
                <label htmlFor="workingDirInput">Path to game</label>
                <DirectoryPicker defaultPath={options.root} onPathChange={(value) => setOptions(_.merge({...options}, {root: `${value}\\minecraft`} ))}/>

                <label htmlFor="customArgsInput">Custom args</label>
                <input type="text" defaultValue={options.customArgs} onChange={(e) => setOptions(_.merge({...options}, {customArgs: e.target.value.split(" ")}))}/>

                <label htmlFor="">Min RAM size: {options.memory.min}mb</label>
                <input type="range" max={options.memory.max} 
                defaultValue={options.memory.min} min={1024} onChange={(e) => setOptions(
                    _.merge({...options},{memory:{min: e.target.value}})
                )} />

                <label htmlFor="">Max RAM size: {options.memory.max}mb</label>
                <input type="range" min={options.memory.min} defaultValue={options.memory.max} max={avialableRAM} onChange={(e) => setOptions(
                    _.merge({...options},{memory:{max: e.target.value}})
                )}/>
                
                <label htmlFor="">Game width</label>
                <input disabled={options.window.fullscreen} defaultValue={options.window.width} type="number" onChange={(e) => setOptions(
                    _.merge({...options},{window:{width: e.target.value}})
                )}/>

                <label htmlFor="">Game height</label>
                <input disabled={options.window.fullscreen} defaultValue={options.window.height} type="number" onChange={(e) => setOptions(
                    _.merge({...options},{window:{height: e.target.value}})
                )}/>

                <label htmlFor="">Fullscreen</label>
                <input checked={options.window.fullscreen} type="checkbox" onChange={(e) => setOptions(
                    _.merge({...options},{window:{fullscreen: e.target.checked}})
                )}/>

                <Button type="submit">Save</Button>
            </form>
        </div>
    );
}
 
export default Settings;