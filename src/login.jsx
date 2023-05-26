import React from 'react';
import { useState, useEffect } from 'react';
import Progress from './progress.jsx';
import Button from './button.jsx';
import './login.sass';

const Form = (props) => {
    const [nickname, setNickname] = useState('Nickname');
    const [running, setRunning] = useState(false);

    useEffect(() =>{
        const savedNickname = window.localStorage.getItem('nickname'); 
        if (savedNickname) setNickname(savedNickname);
    }, []);

    const nicknameChangeHandler = (nickname) => {
        if (!nickname) return
        setNickname(nickname);
        window.localStorage.setItem('nickname', nickname);
        window.something.changeNickname(nickname);
    }

    const playButtonClickHandler = () => {
        setRunning(true);
        window.something.play();
    }

    const registrationButtonClickHandler = () => {
        window.something.registration();
    }

    const collectFormData = (form) => {
        let formData = new FormData();
    }

    return (
        <form className="form" onSubmit={(e) => collectFormData(e.target)}>
            <input name="nickname" onBlur={(e) => nicknameChangeHandler(e.target.value)} placeholder={nickname} className="form__input" type="text" />
            <input name="password" placeholder="password" className="form__input" type="password" />
            <Button disabled={running} onClick={() => playButtonClickHandler()}>Play</Button>
            <Button disabled={running} onClick={() => registrationButtonClickHandler()}>Registration</Button>
            <Progress disabled={!running} status={props.progress}/> 
        </form>
    );
}
 
export default Form;