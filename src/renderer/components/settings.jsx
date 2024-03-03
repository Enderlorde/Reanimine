import React, { useEffect, useState } from "react";

import Switch from "./switch.jsx";
import DirectoryPicker from "./directoryPicker.jsx";
import Dropdown from "./dropdown.jsx";

import settings_styles from "./settings.module.css";
import message_styles from "./message.module.css";
import backplate_styles from "./backplate.module.css";
import plate_styles from "./plate.module.css";
import button_stytles from "./button.module.css";

const Settings = () => {
    const [versions, setVersions] = useState();
    const [filter, setFilter] = useState("release old_beta old_alpha");

    useEffect(() => {
        fetch("https://piston-meta.mojang.com/mc/game/version_manifest.json")
            .then((response) => response.json())
            .then((manifest) => {
                setVersions(
                    manifest.versions
                        .filter((versionObj) =>
                            filter.includes(versionObj.type),
                        )
                        .map((version) => {
                            return { text: version.id, value: version.url };
                        }),
                );
            });
    });

    /*     const defaultOptions = {
        root: "./minecraft",
        forge: "./minecraft/Forge.jar",
        memory: {
            min: "0",
            max: "512M",
        },
        window: {
            width: 800,
            height: 600,
            fullscreen: false,
        },
    };

    const [avialableRAM, setAvialableRAM] = useState();
    const [options, setOptions] = useState(defaultOptions);
    const [saved, setSaved] = useState(false); 

    const getAvailableRAM = async () => {
        const memoryInBytes = await window.something
            .avialableRAM()
            .then((response) => response);
        const memoryInKBytes = memoryInBytes / 1024;
        const memoryInMBytes = memoryInKBytes / 1024;
        return {
            bytes: memoryInBytes,
            kbytes: memoryInKBytes,
            mbytes: memoryInMBytes,
        };
    };

    useEffect(() => {
        if (!avialableRAM) {
            getAvailableRAM().then((response) =>
                setAvialableRAM(response.mbytes),
            );
        }
    });

    useEffect(() => {
        const localSavedOptions = window.localStorage.getItem("options");
        if (localSavedOptions) {
            setOptions(_.merge({ ...options }, JSON.parse(localSavedOptions)));
        }
    }, []); */

    /*     const submitHandler = (e) => {
        e.preventDefault();
        window.localStorage.setItem("options", JSON.stringify(options));
        window.something.saveOptions(options);
        setSaved(true);
        console.log(options);
    };

    const returnDefault = () => {
        window.localStorage.setItem("options", JSON.stringify(defaultOptions));
        window.something.saveOptions(options);
        console.log(options);
        setOptions({ ...defaultOptions });
    }; */

    const languages = [
        {
            text: "English - United States",
            value: "en_us",
        },
        {
            text: "Русский - Россия",
            value: "ru",
        },
    ];

    const content = [
        {
            title: { en: "language", ru: "Язык" },
            adjustments: [<Dropdown key="language" content={languages} />],
        },
        {
            title: { en: "launcher settings", ru: "Настройки лаунчера" },
            adjustments: [
                <Switch
                    key={1}
                    disabled={true}
                    text={{
                        en: "Use beta version for launcher",
                        ru: "Использовать бета-версию лаунчера",
                    }}
                />,
                <Switch
                    key={2}
                    disabled={true}
                    text={{
                        en: "Keep the launcher open while in the Launcher",
                        ru: "Не закрывать лаунчер",
                    }}
                />,

                <Switch
                    key={3}
                    disabled={true}
                    text={{
                        en: "Disable hardware acceleration (requires restarting the Launcher)",
                        ru: "Отключить аппаратное ускорение (требуется перезапуск лаунчера)",
                    }}
                />,
            ],
        },
        {
            title: {
                en: "launcher accesibility settings",
                ru: "Настройки доступности",
            },
            adjustments: [
                <Switch
                    key={1}
                    text={{
                        en: "Make text side bigger",
                        ru: "Сделать текст больше",
                    }}
                />,
            ],
        },
        {
            title: {
                en: "minecraft: java edition settings",
                ru: "Настройки minecraft: java edition",
            },
            adjustments: [
                <div key="root" className={settings_styles.directory}>
                    <p>Change root directory:</p>

                    <DirectoryPicker />
                </div>,
                <div key="version" className={settings_styles.directory}>
                    <p>Change version:</p>

                    {versions && <Dropdown type="mini" content={versions} />}
                </div>,
                <Switch
                    key="log"
                    text={{
                        en: "Open output log when Minecraft: Java Edition starts",
                        ru: "Открыть лог когда игра запустится",
                    }}
                />,
                <Switch
                    key={2}
                    text={{
                        en: "Automatically send Minecraft: Java Edition reports to Mojang Studios",
                        ru: "Автоматически отсылать отчет в Mojang Studios",
                    }}
                />,
                <Switch
                    key={3}
                    text={{
                        en: "Show historical versions of Minecraft: Java Edition in the Launcher",
                        ru: "Показать прошлые версии в лаунчере",
                    }}
                />,
            ],
        },
    ];

    const confirmText = { en: "Reset Settings", ru: "Сбросить настройки" };

    return (
        <div className={settings_styles.settings}>
            <div className={message_styles.message}>
                Some settings may require restarting the Launcher in order to
                start working
            </div>

            {/*        <form className="settings__form" action="" onSubmit={(e) => submitHandler(e)}>
                <ul className='settings__list'>
                    <li className='settings__item'>
                        <label className='settings__label' htmlFor="language">language</label>

                        <Dropdown className="dropdown settings__dropdown" name="language" content={{header: "English - United States", list:["Русский"]}}/>
                    </li>
                </ul>

                <label htmlFor="workingDirInput">Path to game</label>
                <DirectoryPicker defaultPath={options.root} onPathChange={(value) => {
                    setSaved(false);

                    setOptions(_.merge({...options}, {
                        root: `${value}/minecraft`,
                        customArgs: [`-javaagent:${value}\\minecraft\\authlib-injector-1.2.2.jar=ely.by`, "-Dauthlibinjector.ignoredPackages=forgewrapper"],
                        forge: `${value}/minecraft/Forge.jar`,
                    } ))}
                }/>

                <label htmlFor="">Min RAM size: {options.memory.min}mb</label>
                <input type="range" max={options.memory.max} 
                defaultValue={options.memory.min} min={0} onChange={(e) =>
                    {
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{memory:{min: e.target.value}})
                        )
                    }
                }/>

                <label htmlFor="">Max RAM size: {options.memory.max}mb</label>
                <input type="range" min={options.memory.min} defaultValue={options.memory.max} max={avialableRAM} onChange={(e) =>
                    {         
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{memory:{max: e.target.value}})
                        )
                    }
                }/>
                
                <label htmlFor="">Game width</label>
                <input className="form__input" disabled={options.window.fullscreen} defaultValue={options.window.width} type="number" onChange={(e) =>
                    { 
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{window:{width: e.target.value}})
                        )
                    }
                }/>

                <label htmlFor="">Game height</label>
                <input className="form__input" disabled={options.window.fullscreen} defaultValue={options.window.height} type="number" onChange={(e) =>
                    { 
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{window:{height: e.target.value}})
                        )
                    }
                }/>

                <label htmlFor="">Fullscreen</label>
                <input checked={options.window.fullscreen} type="checkbox" onChange={(e) =>
                    {
                        setSaved(false);

                        setOptions(
                            _.merge({...options},{window:{fullscreen: e.target.checked}})
                        )
                    }
                }/>

                <button className='form__button' disabled={saved} type="submit">{saved?'Saved':'Save'}</button>
                <button className='form__button' type="submit" onClick={() => returnDefault()}>Reset</button>
            </form> */}

            <form action="" className={settings_styles.form}>
                <ul className={settings_styles.root}>
                    {content.map((category, index) => {
                        return (
                            <li
                                key={index}
                                className={`${settings_styles.category} ${backplate_styles.backplate}`}>
                                <h2 className={`${settings_styles.title}`}>
                                    {category.title.en}
                                </h2>

                                <ul
                                    className={`${settings_styles.categoryContent} ${plate_styles.plate}`}>
                                    {category.adjustments &&
                                        category.adjustments.map(
                                            (adjustment, index) => {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={`${settings_styles.item} ${plate_styles.element}`}>
                                                        {adjustment}
                                                    </li>
                                                );
                                            },
                                        )}
                                </ul>
                            </li>
                        );
                    })}
                </ul>

                {confirmText && (
                    <button
                        className={`${button_stytles.button} ${button_stytles.align_center} ${button_stytles.color_red}`}>
                        {confirmText.en}
                    </button>
                )}
            </form>
        </div>
    );
};

export default Settings;
