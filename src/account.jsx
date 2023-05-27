import React from 'react';
import { useRef,useEffect, useState, Suspense } from 'react';
import {SkinViewer} from 'skinview3d';
import Skin from '../static/skin.png';

import './account.sass';

const Account = () => {
    const viewport = useRef();
    const [mode, setMode] = useState('offline');

    useEffect(() => {

        const mode = window.sessionStorage.getItem('mode');

        if (mode) setMode(mode);
    },[]);

    useEffect(() => {
        const nickname = window.localStorage.getItem('nickname');

        if(nickname && mode == 'Online'){
            let skinViewer = new SkinViewer({
                canvas: viewport.current,
                width: 240,
                height: 320,
                skin: `http://skinsystem.ely.by/skins/${nickname}`,
            });
        }
    },[mode])

    console.log(mode);

    return (
        <div className="account">
            {mode == 'Online'?
                <div className="account__wrapper">
                    <Suspense>
                        <canvas ref={viewport}></canvas>
                    </Suspense>
                    
                </div>:
                <h2>Log in online to use this page</h2>
            }
        </div>
    );
}
 
export default Account;