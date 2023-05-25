import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import Navigation from './navigation.jsx';
import Header from './header.jsx';
import Logo from './icons/logo.svg';
import Login from './login.jsx';
import Map from './map.jsx';
import Wiki from './wiki.jsx';
import Account from './account.jsx';
import Settings from './settings.jsx';
import './app.sass';

const App = () => {
    const [progressState, setProgressState] = React.useState({ type: 'none', task: 0, total: 100 });

    window.something.handleCounter((e, value) => {
        setProgressState(value);
        console.log(value);
    });

    window.something.handleDownload((e, value) => {
        console.log('downloadDone');
        console.log(value);
    })

    return (
        <div className="app">
            <Header title="launcher"/>
            <Navigation />
            {useLocation().pathname == '/' &&  
                <div className="app__wrapper">
                    <Logo width={200} height={200}/>
                    <Login progress={progressState}/>
                </div>
            }
            <Outlet />
           
            
            
        </div>
    );
}

const router = createBrowserRouter([
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