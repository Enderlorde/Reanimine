import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactComponent as ErrorIcon } from './static/error.svg';
import './app.sass';

const Modal = () => {
    const [message, setMessage] = useState('Error');

    window.modalAPI.messageHandler((event, message) => {
        setMessage(message)
    })

    const buttonHandler = () => {
        window.modalAPI.close();
    }  

    return (
        <div className="modal">
            <div className="modal__block modal__block_red">
                <ErrorIcon className="modal__icon" width={100} height={100} />
            </div>

            <div className="modal__block">
                <h1 className='modal__title'>Ooops!</h1>

                <p className='modal__message'>{message}</p>

                <button className='modal__button' onClick={() => buttonHandler()} >Ok</button>
            </div>
        </div>
    );
}
 
ReactDOM.createRoot(document.querySelector('#root')).render(<Modal />);