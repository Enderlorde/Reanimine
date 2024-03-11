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
import NewsUrl from "../static/News Icon.png";
import JavaIcon from "../static/Java Edition Icon.svg?react";
import BedrockIcon from "../static/Bedrock Icon.svg?react";
import EducationIcon from "../static/Education Edition Icon.svg?react";
import DungeonsIcon from "../static/Minecraft dungons 1.svg?react";
import LegendsIcon from "../static/Minecraft legends icon 1.svg?react";
import app_styles from "./app.module.css";

const App = () => {
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

    return (
        <div className={app_styles.app}>
            <Navigation
                content={{
                    list: [
                        [
                            {
                                name: { en: "news", ru: "Новости" },
                                path: "news",
                                icon: (
                                    <img
                                        src={NewsUrl}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                        }}
                                    />
                                ),
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
                                icon: <BedrockIcon width={36} height={40} />,
                            },
                            {
                                name: {
                                    en: "Education edition",
                                    ru: "Образовательное издание",
                                },
                                path: "education",
                                icon: <EducationIcon width={36} height={40} />,
                            },
                            {
                                name: {
                                    en: "MC Dungeons",
                                    ru: "MC Подземелья",
                                },
                                path: "dungeons",
                                icon: <DungeonsIcon width={36} height={40} />,
                            },
                            {
                                name: {
                                    en: "Mc Legends",
                                    ru: "MC Легенды",
                                },
                                path: "legends",
                                icon: <LegendsIcon width={36} height={40} />,
                            },
                        ],
                        [
                            {
                                name: {
                                    en: "settings/accounts",
                                    ru: "Настройки/аккаунты",
                                },
                                path: "settings",
                                classes: ["size_small", "align_center"],
                            },
                            {
                                name: { en: "more", ru: "больше" },
                                path: "",
                                classes: [
                                    "size_small",
                                    "color_purple",
                                    "align_center",
                                ],
                            },
                        ],
                    ],
                }}
            />
            <div className={app_styles.wrapper}>
                <TitleBar title="Reanimine" menu={menu} />
                {useLocation().pathname == "/" && <News />}
                <div className={app_styles.content}>
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
