import React from 'react';
import { useRef,useEffect } from 'react';
import {SkinViewer} from 'skinview3d';

import Skin from '../static/skin.png';
import './account.sass';

const Account = () => {
    const viewport = useRef();

    useEffect(() => {
        let skinViewer = new SkinViewer({
            canvas: viewport.current,
            width: 240,
            height: 320,
            skin: Skin,
        });
    },[]);

    return (
        <div className="account">
            <canvas ref={viewport}></canvas>
            <button className="account__load">load</button>
        </div>
    );
}
 
export default Account;