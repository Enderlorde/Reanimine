import React from 'react';
import { useState } from 'react';
import Button from './button.jsx';
import DirectoryPicker from './directoryPicker.jsx';
import './settings.sass';

const Settings = () => {
    const [minRAM, setMinRAM] = useState(0);
    const [maxRAM, setMaxRAM] = useState(2);

    return (
        <div className="settings">
            <form className="settings__form form" action="">
                <label htmlFor="workingDirInput">Path to game</label>
                {console.log(window.something.avialableROM())}
                <DirectoryPicker />
                <label htmlFor="customArgsInput">Custom args</label>
                <input className="" id="customArgsInput" type="text" />
                <label htmlFor="">Min RAM size: {minRAM}gb</label>
                <input className="form__input" type="range" max={maxRAM} defaultValue={minRAM} onChange={(e) => setMinRAM(e.target.value)} />
                <label htmlFor="">Max RAM size: {maxRAM}gb</label>
                <input className="form__input" type="range" min={minRAM} defaultValue={maxRAM} max={8} onChange={(e) => setMaxRAM(e.target.value)} />
                <label htmlFor="">Game width</label>
                <input className="form__input" type="number" />
                <label htmlFor="">Game height</label>
                <input className="form__input" type="number" />
                <label htmlFor="">Fullscreen</label>
                <input className="form__input" type="checkbox" />
                <Button>Save</Button>
            </form>
        </div>
    );
}
 
export default Settings;