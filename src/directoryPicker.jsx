import React from 'react';
import { useState } from 'react';
import './directoryPicker.sass';

const DirectoryPicker = () => {
    let [path,setPath] = useState('none');

    const getDirectoryPath = () => {
        window.something.selectFolder().then((response) => setPath(response));
    }

    return (
        <div className="directoryPicker">
            <button type="button" onClick={() => getDirectoryPath()}>...</button>
            <input className="directoryPicker__path" value={path} readOnly/>
        </div>
    );
}
 
export default DirectoryPicker;