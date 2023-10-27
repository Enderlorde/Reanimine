import React from 'react';
import {ReactComponent as PromoImage} from '../static/game_background.svg';
import Feed from './feed';
import './game.sass';

const Game = (props) => {
    return (
        <div className="game">
            <PromoImage />

            <div className="game__breakpoint">

            </div>

            <Feed className="game__feed" link="https://launchercontent.mojang.com/javaPatchNotes.json" size={50} />

            <div className='game__requirements-wrapper'>
                <div className="game__requirements">
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
                                    <span>{props.requirements.headset.min}</span>
                                </td>

                                <td>
                                    <span>{props.requirements.headset.rec}</span>
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
}
 
export default Game;