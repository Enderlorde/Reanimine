import React from 'react';
import './game.sass';
import {ReactComponent as PromoImage} from '../static/game_background.svg';

const Game = (props) => {
    return (
        <div className="game">
            <PromoImage />
            <div className="game__breakpoint">

            </div>

            <div className='game__requirements-wrapper'>
                <div className="game__requirements">
                    <h2>System requirements</h2>
                    <table className="">
                        <thead>
                            <td></td>
                            <td>Minimum Requirements</td>
                            <td>Recommended Requirements</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Operation System</td>
                                <td>{props.requirements.os.min}</td>
                                <td>{props.requirements.os.rec}</td>
                            </tr>
                            <tr>
                                <td>Architecture</td>
                                <td>{props.requirements.arch.min}</td>
                                <td>{props.requirements.arch.rec}</td>
                            </tr>
                            <tr>
                                <td>Memory</td>
                                <td>{props.requirements.ram.min}</td>
                                <td>{props.requirements.ram.rec}</td>
                            </tr>
                            <tr>
                                <td>Motion Controller</td>
                                <td>{props.requirements.motion.min}</td>
                                <td>{props.requirements.motion.rec}</td>
                            </tr>
                            <tr>
                                <td>Headset</td>
                                <td>{props.requirements.headset.min}</td>
                                <td>{props.requirements.headset.rec}</td>
                            </tr>
                            <tr>
                                <td>Processor</td>
                                <td>{props.requirements.cpu.min}</td>
                                <td>{props.requirements.cpu.rec}</td>
                            </tr>
                            <tr>
                                <td>Graphics</td>
                                <td>{props.requirements.gpu.min}</td>
                                <td>{props.requirements.gpu.rec}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
 
export default Game;