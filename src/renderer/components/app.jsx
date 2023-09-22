import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './navigation.jsx';
import Header from './header.jsx';
import Login from './login.jsx';
import News from './news.jsx';
import Map from './map.jsx';
import Wiki from './wiki.jsx';
import Account from './account.jsx';
import Settings from './settings.jsx';
import {ReactComponent as NewsIcon} from './icons/News Icon.svg';
import {ReactComponent as JavaIcon} from './icons/Java Edition Icon.svg';
import {ReactComponent as BedrockIcon} from './icons/Bedrock Icon.svg';
import {ReactComponent as DungeonsIcon} from './icons/Minecraft dungons 1.svg';
import {ReactComponent as LegendsIcon} from './icons/Minecraft legends icon 1.svg';
import {ReactComponent as EducationIcon} from './icons/Education Edition Icon.svg';
import './app.sass';

const App = () => {
    const [progressState, setProgressState] = useState({ type: 'none', current: 0, total: 100 });
    const [running, setRunning] = useState(false);
    const [appVersion, setAppVersion] = useState();
    const [menu, setMenu] = useState();
    const [currentLocation, setCurrentLocation] = useState();

    const navigate = useNavigate();

    const settingsMenu = {
        header: "settings",
        list: [{
            text:"account",
            function: () => navigate("/account")
        }, {
            text:"about",
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
                menuTemp.header = "accounts"
                menuTemp.list[0] = {
                    text:"settings",
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
        header: "MINECRAFT BEDROCK",
        list: ["FAQ", "INSTALLATION", "PATCH NOTE"]
    }

    return (
        <div className="app">
            <Header title="Reanimine" menu={menu}/>

            <div className="app__content">
                <Navigation className="navigation app__navigation" content={{
                    list: [
                        [{
                            name: "news", 
                            path: "news",
                            icon: <NewsIcon width={20} height={20}/>
                        }], 

                        [{
                            name:"java edition", 
                            path:"",
                            icon: <JavaIcon width={20} height={20}/>
                        }, {
                            name:"bedrock edition", 
                            path:"",
                            icon: <BedrockIcon width={20} height={20}/>
                        }, {
                            name:"education edition", 
                            path:"",
                            icon: <EducationIcon width={20} height={20}/>
                        }, {
                            name:"mc dungeons", 
                            path:"",
                            icon: <DungeonsIcon width={20} height={20}/>
                        }, {
                            name:"mc legends", 
                            path:"",
                            icon: <LegendsIcon width={20} height={20}/>
                        }], 

                        [{
                            name:"settings/accounts", 
                            path:"settings"
                        }, {
                            name:"more", 
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
            },
            {
                path: "news",
                element: <News />
            }
        ]
    }   
]);
 
ReactDOM.createRoot(document.querySelector('#root')).render(
    <RouterProvider router={router} />
);