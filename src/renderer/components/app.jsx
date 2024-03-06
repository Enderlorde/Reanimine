import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
    createHashRouter,
    RouterProvider,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import Navigation from "./navigation.jsx";
import TitleBar from "./titlebar";
import News from "./news.jsx";
import Map from "./map.jsx";
import Mods from "./mods.jsx";
import Game from "./game.jsx";
import Accounts from "./accounts";
import Settings from "./settings.jsx";
import NewsIcon from "../static/news.svg?react";
import JavaIcon from "../static/minecraft.svg?react";
import MapIcon from "../static/map.svg";
import SettingsIcon from "../static/settings.svg?react";
import ModsIcon from "../static/mods.svg";
import "./app.sass";

const App = () => {
    const [progressState, setProgressState] = useState({
        type: "none",
        current: 0,
        total: 100,
    });
    const [running, setRunning] = useState(false);
    const [appVersion, setAppVersion] = useState();
    const [menu, setMenu] = useState([]);
    const [currentLocation, setCurrentLocation] = useState();

    const navigate = useNavigate();

    const settingsMenu = {
        header: { en: "settings", ru: "Настройки" },
        list: [
            {
                text: { en: "accounts", ru: "Аккаунты" },
                function: () => navigate("/account"),
            },
            {
                text: { en: "about", ru: "О НАС" },
                function: () => console.log("about"),
            },
        ],
    };

    const bedrockMenu = {
        header: "MINECRAFT BEDROCK",
        list: [
            {
                text: "FAQ",
                function: () => console.log("FAQ"),
            },
            {
                text: "INSTALLATION",
                function: () => console.log("installation"),
            },
            {
                text: "PATCH NOTE",
                function: () => console.log("path note"),
            },
        ],
    };

    const location = useLocation();

    useEffect(() => {
        if (location == currentLocation) return;
        setCurrentLocation(location);
        console.log(location);
        switch (location.pathname) {
            case "/settings":
                setMenu({ ...settingsMenu });
                break;
            case "/account":
                let menuTemp = settingsMenu;
                menuTemp["header"] = { en: "accounts", ru: "Аккаунты" };
                menuTemp["list"][0] = {
                    text: { en: "settings", ru: "настройки" },
                    function: () => navigate("/settings"),
                };
                setMenu({ ...menuTemp });
                break;
            default:
                setMenu(null);
                break;
        }
    });

    /*     useEffect(() => {
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
    },[]); */

    /*     const handlePlay = () => {
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
    } */

    const testMen = {
        header: { en: "MINECRAFT BEDROCK", ru: "MINECRAFT BEDROCK" },
        list: [
            { en: "FAQ", ru: "FAQ" },
            { en: "INSTALLATION", ru: "Установка" },
            { en: "PATCH NOTE", ru: "История изменений" },
        ],
    };

    return (
        <div className="app">
            <TitleBar title="Reanimine" menu={menu} />

            <div className="app__content">
                <Navigation
                    className="navigation app__navigation"
                    content={{
                        list: [
                            [
                                {
                                    name: { en: "news", ru: "Новости" },
                                    path: "news",
                                    icon: <NewsIcon width={36} height={40} />,
                                },
                            ],
                            [
                                {
                                    name: {
                                        en: "Java edition",
                                        ru: "Java edition",
                                    },
                                    path: "je",
                                    icon: <JavaIcon width={36} height={40} />,
                                },
                                {
                                    name: {
                                        en: "Bedrock edition",
                                        ru: "Bedrock edition",
                                    },
                                    path: "bedrock",
                                    icon: <JavaIcon width={36} height={40} />,
                                },
                            ],
                            /*  [
                                {
                                    name: { en: "Reanimine", ru: "Reanimine" },
                                    path: "reanimine",
                                },
                                {
                                    name: { en: "map", ru: "Карта" },
                                    path: "map",
                                    icon: <MapIcon width={36} height={40} />,
                                },
                                {
                                    name: { en: "Mods", ru: "Моды" },
                                    path: "mods",
                                    icon: <ModsIcon width={36} height={40} />,
                                },
                            ], */
                            [
                                {
                                    name: {
                                        en: "settings/accounts",
                                        ru: "Настройки/аккаунты",
                                    },
                                    path: "settings",
                                    icon: (
                                        <SettingsIcon width={36} height={40} />
                                    ),
                                },
                                {
                                    name: { en: "more", ru: "больше" },
                                    path: "",
                                    classes: ["color_purple", "align_center"],
                                },
                            ],
                        ],
                    }}
                />

                <div className="app__wrapper">
                    {useLocation().pathname == "/" && <News />}

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "reanimine",
                element: (
                    <Game
                        title="reanimine"
                        requirements={{
                            os: {
                                min: "Windows 10 version 14393.0 or higher",
                                rec: "Windows 10 version 14393.0 or higher",
                            },
                            arch: {
                                min: "ARM, x64, x86",
                                rec: "ARM, x64, x86",
                            },
                            ram: {
                                min: "4 GB",
                                rec: "8 GB",
                            },
                            motion: {
                                min: "Not specified",
                                rec: "Windows Mixed Reality motion contollers",
                            },
                            headset: {
                                min: "Not specified",
                                rec: "Windows Mixed Reality immersive headset",
                            },
                            cpu: {
                                min: "Intel Celeron J4105 | AMD FX-4100",
                                rec: "Intel i7-65000U | AMD A8-6600K",
                            },
                            gpu: {
                                min: "Intel HD Graphics 4000 | AMD Radeon R5",
                                rec: "NVIDIA GeForce 940M | AMD Radon HD 8570D",
                            },
                        }}
                    />
                ),
            },
            {
                path: "map",
                element: <Map />,
            },
            {
                path: "mods",
                element: <Mods />,
            },
            {
                path: "account",
                element: <Accounts />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "news",
                element: <News />,
            },
            {
                path: "je",
                element: (
                    <Game
                        key="java"
                        title="java"
                        newsLink="https://launchercontent.mojang.com/javaPatchNotes.json"
                        requirements={{
                            os: {
                                min: "Windows 10 version 14393.0 or higher",
                                rec: "Windows 10 version 14393.0 or higher",
                            },
                            arch: {
                                min: "ARM, x64, x86",
                                rec: "ARM, x64, x86",
                            },
                            ram: {
                                min: "4 GB",
                                rec: "8 GB",
                            },
                            motion: {
                                min: "Not specified",
                                rec: "Windows Mixed Reality motion contollers",
                            },
                            headset: {
                                min: "Not specified",
                                rec: "Windows Mixed Reality immersive headset",
                            },
                            cpu: {
                                min: "Intel Celeron J4105 | AMD FX-4100",
                                rec: "Intel i7-65000U | AMD A8-6600K",
                            },
                            gpu: {
                                min: "Intel HD Graphics 4000 | AMD Radeon R5",
                                rec: "NVIDIA GeForce 940M | AMD Radon HD 8570D",
                            },
                        }}
                    />
                ),
            },
            {
                path: "bedrock",
                element: (
                    <Game
                        key="bedrock"
                        title="bedrock"
                        newsLink="https://launchercontent.mojang.com/bedrockPatchNotes.json"
                        requirements={{
                            os: {
                                min: "Windows 10 version 14393.0 or higher",
                                rec: "Windows 10 version 14393.0 or higher",
                            },
                            arch: {
                                min: "ARM, x64, x86",
                                rec: "ARM, x64, x86",
                            },
                            ram: {
                                min: "4 GB",
                                rec: "8 GB",
                            },
                            motion: {
                                min: "Not specified",
                                rec: "Windows Mixed Reality motion contollers",
                            },
                            headset: {
                                min: "Not specified",
                                rec: "Windows Mixed Reality immersive headset",
                            },
                            cpu: {
                                min: "Intel Celeron J4105 | AMD FX-4100",
                                rec: "Intel i7-65000U | AMD A8-6600K",
                            },
                            gpu: {
                                min: "Intel HD Graphics 4000 | AMD Radeon R5",
                                rec: "NVIDIA GeForce 940M | AMD Radon HD 8570D",
                            },
                        }}
                    />
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.querySelector("#root")).render(
    <RouterProvider router={router} />,
);
