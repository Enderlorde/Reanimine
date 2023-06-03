import React from 'react';
import { useState, useEffect } from 'react';
import './directoryPicker.sass';

const DirectoryPicker = (props) => {
    let [path,setPath] = useState('none');

    useEffect(()=>{
        props.onPathChange(path);
    },[path]);

   /*  useEffect(()=>{
        if (props.defaultPath) setPath(props.defaultPath);
        console.log(props.defaultPath);
    },[])
 */
    const getDirectoryPath = () => {
        window.something.selectFolder().then((response) => setPath(response));
    }

    return (
        <div className="directoryPicker">
            <button className="directoryPicker__button" type="button" onClick={() => getDirectoryPath()}>...</button>
            <input className="directoryPicker__path" value={props.defaultPath} readOnly/>
        </div>
    );
}
 
export default DirectoryPicker;