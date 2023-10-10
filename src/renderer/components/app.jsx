import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './navigation.jsx';
import Header from './header.jsx';
import Login from './login.jsx';
import News from './news.jsx';
import Map from './map.jsx';
import Mods from './mods.jsx';
import Game from './game.jsx';
import Account from './account.jsx';
import Settings from './settings.jsx';
import JavaEdition from './JavaEdition.jsx';
import {ReactComponent as NewsIcon} from './icons/News Icon.svg';
import {ReactComponent as JavaIcon} from './icons/Java Edition Icon.svg';
import './app.sass';

const App = () => {
    const [progressState, setProgressState] = useState({ type: 'none', current: 0, total: 100 });
    const [running, setRunning] = useState(false);
    const [appVersion, setAppVersion] = useState();
    const [menu, setMenu] = useState();
    const [currentLocation, setCurrentLocation] = useState();

    const navigate = useNavigate();

    const settingsMenu = {
        header: {en:"settings", ru:"Настройки"},
        list: [{
            text:{en:"accounts", ru:"Аккаунты"},
            function: () => navigate("/account")
        }, {
            text:{en:"about", ru:"О НАС"},
            function: () => console.log("about")
        }]
    }

    const bedrockMenu = {
        header: "MINECRAFT BEDROCK",
        list: [{
            text:"FAQ",
            function: () => console.log("FAQ")
        }, {
            text:"INSTALLATION",
            function: () => console.log("installation")
        }, {
            text:"PATCH NOTE",
            function: () => console.log("path note")
        }]
    }

    const location = useLocation();

    useEffect(() => {
        if (location == currentLocation) return ;
        setCurrentLocation(location);
        console.log(location);
        switch(location.pathname){
            case "/settings": 
                setMenu({...settingsMenu})
            break;
            case "/account":
                let menuTemp = menu
                menuTemp.header = {en:"accounts", ru:"Аккаунты"}
                menuTemp.list[0] = {
                    text:{en:"settings", ru:"настройки"},
                    function: () => navigate("/settings")
                }
                setMenu({...menuTemp})
            break;
            default: 
                setMenu(null)
            break;
        }
    });

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

        window.something.getAppVersion().then((appVersion) => {
            setAppVersion(appVersion);
        })
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

    const testMen = {
        header: {en:"MINECRAFT BEDROCK", ru:"MINECRAFT BEDROCK"},
        list: [{en:"FAQ", ru:"FAQ"}, {en:"INSTALLATION", ru:"Установка"}, {en:"PATCH NOTE", ru:"История изменений"}]
    }

    return (
        <div className="app">
            <Header title="Reanimine" menu={menu}/>

            <div className="app__content">
                <Navigation className="navigation app__navigation" content={{
                    list: [
                        [{
                            name: {en:"news", ru:"Новости"}, 
                            path: "news",
                            icon: <NewsIcon width={20} height={20}/>
                        }], 

                        [{
                            name:{en:"Java edition", ru:"Java edition"}, 
                            path:"je",
                            icon: <JavaIcon width={20} height={20}/>
                        }],
                        [{
                            name:{en:"Reanimine", ru:"Reanimine"},
                            path:"game"
                        },{
                            name:{en:"map", ru:"Карта"},
                            path:"map"
                        },{
                            name:{en:"Mods", ru:"Моды"},
                            path:"mods"
                        }],
                        [{
                            name:{en:"settings/accounts", ru:"Настройки/аккаунты"}, 
                            path:"settings"
                        }, {
                            name:{en:"more", ru:"больше"}, 
                            path:""
                        }]
                    ]
                }}/>
                
                <div className="app__wrapper">
                    {useLocation().pathname == '/' &&  
                            /* <Logo width={200} height={200}/>
                            <Login playHandler={() => handlePlay()} running={running} progress={progressState}/> */
                            <News/>
                    }
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "game",
                element: <Game />
            },
            {
                path: "map",
                element: <Map />
            },
            {
                path: "mods",
                element: <Mods />
            },
            {
                path: "account",
                element: <Account />
            },    {
                path: "settings",
                element: <Settings />
            },
            {
                path: "news",
                element: <News />
            },{
                path: "je",
                element: <JavaEdition />
            }
        ]
    }   
]);
 
ReactDOM.createRoot(document.querySelector('#root')).render(
    <RouterProvider router={router} />
);