import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactComponent as ErrorIcon } from './static/error.svg';
import './app.sass';

const Modal = () => {
    const [message, setMessage] = useState('Error');

    window.modalAPI.messageHandler((event, message) => {
        setMessage(message)
    })

    return (
        <div className="modal">
            <h1>Error: {message}</h1>
            <ErrorIcon width={100} height={100}/>
        </div>
    );
}
 
ReactDOM.createRoot(document.querySelector('#root')).render(<Modal />);