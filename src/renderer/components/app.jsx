import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import Navigation from './navigation.jsx';
import Header from './header.jsx';
import {ReactComponent as Logo} from './icons/logo.svg';
import Login from './login.jsx';
import Map from './map.jsx';
import Wiki from './wiki.jsx';
import Account from './account.jsx';
import Settings from './settings.jsx';
import './app.sass';

const App = () => {
    const [progressState, setProgressState] = useState({ type: 'none', current: 0, total: 100 });
    const [running, setRunning] = useState(false);

    useEffect(() => {
        window.something.handleCounter((e, value) => {
            setProgressState(value);
            //console.log(value);
        });
    
        window.something.handleDownload((e, value) => {
            console.log('downloadDone');
            console.log(value);
        });

        window.something.handleClosing(() => {
            setRunning(false);
            window.sessionStorage.removeItem('pid');
        });
    },[]);
    
    const handlePlay = () => {
        setRunning(true);
        window.sessionStorage.setItem('pid', true)
        window.something.play().then((process) => {
            //console.log(process);
            if (process)
                window.sessionStorage.setItem('pid', process.pid);
        }).catch((e) => {
            console.log(e);
            setRunning(false);
        });
    }

    return (
        <div className="app">
            <Header title="Reanimine"/>
            <Navigation />
            {useLocation().pathname == '/' &&  
                <div className="app__wrapper">
                    <Logo width={200} height={200}/>
                    <Login playHandler={() => handlePlay()} running={running} progress={progressState}/>
                </div>
            }
            <Outlet /> 
        </div>
    );
}

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "map",
                element: <Map />
            },
            {
                path: "wiki",
                element: <Wiki />
            },
            {
                path: "account",
                element: <Account />
            },    {
                path: "settings",
                element: <Settings />
            }
        ]
    }   
]);
 
ReactDOM.createRoot(document.querySelector('#root')).render(
    <RouterProvider router={router} />
);