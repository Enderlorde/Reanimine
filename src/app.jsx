import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './header.jsx';
import Logo from './icons/logo.svg';
import Form from './form.jsx';
import Navigation from './navigation.jsx'
import './app.sass';

const Main = () => {
    return (
        <div className="main">
            <Header title="launcher"/>
            <Navigation />
            <Logo width={200} height={200}/>
            <Form />
        </div>
    );
}
 
ReactDOM.createRoot(document.querySelector('#root')).render(<Main />);