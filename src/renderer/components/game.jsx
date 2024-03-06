import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PromoImage from "../static/game_background.svg?react";
import Feed from "./feed";
import button_styles from "./button.module.css";
import game_styles from "./game.module.css";

const Game = (props) => {
    const [versions, setVersions] = useState([]);
    const [currentVersion, setCurrentVersion] = useState("");
    const [filter, setFilter] = useState("release old_beta old_alpha");
    const [runProgress, setRunProgress] = useState({});
    const [readyState, setReadyState] = useState(true);
    const [popupState, setPopupState] = useState(false);

    useEffect(() => {
        fetch("https://piston-meta.mojang.com/mc/game/version_manifest.json")
            .then((response) => response.json())
            .then((manifest) => {
                setVersions(
                    manifest.versions
                        .filter((versionObj) =>
                            filter.includes(versionObj.type),
                        )
                        .map((versionObj) => {
                            return {
                                text: { ru: `${versionObj.id}` },
                                function: () =>
                                    setCurrentVersion(versionObj.id),
                            };
                        }),
                );
            });

        setCurrentVersion(window.localStorage.getItem("JE_current_version"));

        window.mainAPI.clearListeners("runProgress");
        window.mainAPI.clearListeners("closing");
        window.mainAPI.clearListeners("childProcess");

        window.mainAPI.handleRunProgress((event, progressJSON) => {
            let progress = JSON.parse(progressJSON);
            setPopupState(true);
            setReadyState(false);
            setRunProgress({ ...progress });
            console.log(progress);
        });

        const handleRunErrors = (error) => {
            setPopupState(true);
            setReadyState(false);
            setRunProgress({
                ...{
                    task: 100,
                    total: 100,
                    name: "Ошибка",
                    type: error,
                },
            });
        };

        window.mainAPI.handleDataMessages((event, dataJSON) => {
            console.log(`Data: ${dataJSON}`);
            if (dataJSON.includes("UnsupportedClassVersionError")) {
                handleRunErrors("Неподдерживаямая версия джава");
            }
        });

        //window.mainAPI.handleClosing((event, code) => {setPopupState(false); setReadyState(true); console.log(`Closed with code ${code}`);})

        window.mainAPI.handleChildProcess(() =>
            setRunProgress({
                ...{
                    name: "Загружено",
                    task: 100,
                    total: 100,
                    type: "Игра запущена",
                },
            }),
        );
    }, []);

    useEffect(() => {
        window.localStorage.setItem("JE_current_version", currentVersion);
    }, [currentVersion]);

    const getAuthorization = async () => {
        const authKey = window.mainAPI.getAuthorization("user");
        return await authKey;
    };

    const runGame = () => {
        console.log("running....");

        let options = {
            root: `./clients/${currentVersion}`,
            version: {
                number: currentVersion,
                type: "release",
            },
            memory: {
                max: "6G",
                min: "4G",
            },
        };

        getAuthorization().then((authKey) =>
            window.mainAPI.runGame(
                JSON.stringify(options),
                JSON.stringify(authKey),
            ),
        );
    };

    return (
        <div className={game_styles.game}>
            {/* <Notification
                className="game__downloadInfo"
                enabled={popupState}
                action={runProgress["name"] ? runProgress["name"] : "Загружаем"}
                filename={runProgress["type"]}
                value={
                    runProgress["task"]
                        ? runProgress["task"]
                        : runProgress["current"]
                }
                maxValue={runProgress["total"]}
            /> */}

            <PromoImage className={game_styles.promo} />

            <div className={game_styles.separator}>
                <div className={game_styles.button}>
                    <button
                        className={`${button_styles.button} ${button_styles.color_green} ${button_styles.align_center} ${button_styles.big} ${button_styles.rounded}`}
                        onClick={() => runGame()}>
                        Play
                    </button>
                </div>

                <div className={game_styles.version}>
                    <p>Текущая версия:</p>
                </div>
            </div>

            {props.newsLink && <Feed link={props.newsLink} size={4} />}

            <div className={`${game_styles.requirementsWrapper}`}>
                <div className={`${game_styles.requirements}`}>
                    <h2>System requirements</h2>
                    <table className="">
                        <thead>
                            <tr>
                                <td></td>

                                <td>
                                    <span>Minimum Requirements</span>
                                </td>

                                <td>
                                    <span>Recommended Requirements</span>
                                </td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <span>Operation System</span>
                                </td>

                                <td>
                                    <span>{props.requirements.os.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.os.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Architecture</span>
                                </td>

                                <td>
                                    <span>{props.requirements.arch.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.arch.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Memory</span>
                                </td>

                                <td>
                                    <span>{props.requirements.ram.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.ram.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Motion Controller</span>
                                </td>

                                <td>
                                    <span>{props.requirements.motion.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.motion.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Headset</span>
                                </td>

                                <td>
                                    <span>
                                        {props.requirements.headset.min}
                                    </span>
                                </td>

                                <td>
                                    <span>
                                        {props.requirements.headset.rec}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Processor</span>
                                </td>

                                <td>
                                    <span>{props.requirements.cpu.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.cpu.rec}</span>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <span>Graphics</span>
                                </td>

                                <td>
                                    <span>{props.requirements.gpu.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.gpu.rec}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

Game.propTypes = {
    requirements: PropTypes.object.isRequired,
    newsLink: PropTypes.string,
};

export default Game;
