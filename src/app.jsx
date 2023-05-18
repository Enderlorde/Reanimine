import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './header.jsx';
import Logo from './icons/logo.svg';
import Form from './form.jsx';
import Navigation from './navigation.jsx';
import Progress from './progress.jsx';
import './app.sass';

const Main = () => {
    const [progressState, setProgressState] = useState({ type: 'none', task: 0, total: 100 });

    window.something.handleCounter((e, value) => {
        setProgressState(value);
        console.log(value);
    });

    return (
        <div className="main">
            <Header title="launcher"/>
            <Navigation />
            <Logo width={200} height={200}/>
            <Form />
            <Progress status={progressState}/>
        </div>
    );
}
 
ReactDOM.createRoot(document.querySelector('#root')).render(<Main />);