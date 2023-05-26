import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Progress from './progress.jsx';
import Button from './button.jsx';
import './login.sass';
import './form.sass';

const Form = (props) => {
    const [nickname, setNickname] = useState();
    const [running, setRunning] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [offlineMode, setOfflineMode] = useState(false);
    const [info, setInfo] = useState('Login or register to play');

    const passwordInputRef = useRef();
 
    useEffect(() =>{
        const savedNickname = window.localStorage.getItem('nickname'); 
        if (savedNickname) setNickname(savedNickname);
    }, []);

    const playButtonClickHandler = () => {
        setRunning(true);
        window.something.play();
    }

    const registrationButtonClickHandler = () => {
        window.something.registration();
    }

    const collectFormData = (e, form) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(form));
        window.something.login(formData).then((result) => {
            setInfo(result);
            setLoggedIn(true)
        });
    }

    const offlineSwitch = () => {
        setOfflineMode(!offlineMode);
        passwordInputRef.current.value = '';
    }

    return (
        <div className="login">
            <p>{info}</p>
            <form  className={loggedIn?'form login__form form_disabled':'form login__form'} onSubmit={(e) => collectFormData(e,e.target)}>
                <input name="nickname" defaultValue={nickname} placeholder={nickname} className="form__input" type="text" />
                <input required ref={passwordInputRef} disabled={offlineMode}  name="password" placeholder="Password" className="form__input" type="password" />
                <button className='form__button' type="submit">Login</button>
                <button className='form__button' type="button" onClick={() => offlineSwitch()}>Offline</button>
                <Button disabled={running} onClick={() => registrationButtonClickHandler()}>Registration</Button>
            </form>
            <Button disabled={!loggedIn} onClick={() => playButtonClickHandler()}>Play</Button>
            
            <Progress disabled={!running} status={props.progress}/> 
        </div> 
    );
}
 
export default Form;