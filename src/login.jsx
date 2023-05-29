import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Progress from './progress.jsx';
import Button from './button.jsx';
import './login.sass';
import './form.sass';
import { json } from 'react-router-dom';

const Form = (props) => {
    const [nickname, setNickname] = useState();
    const [running, setRunning] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [offlineMode, setOfflineMode] = useState(false);
    const [info, setInfo] = useState('Login or register to play');

    const passwordInputRef = useRef();
 
    useEffect(() =>{
        const savedNickname = window.localStorage.getItem('nickname'); 
        const savedPID = window.sessionStorage.getItem('pid');
        const savedMode = window.sessionStorage.getItem('mode');
        if (savedNickname) 
        {
            setNickname(savedNickname);
            if(savedMode){
                setInfo(`${savedMode} mode as ${savedNickname}`);
            }
        }
        if (savedPID) {
            setRunning(true)
        };
        if (savedMode){
            setLoggedIn(true)
        }
    }, []);

    const playButtonClickHandler = () => {
        window.something.play().then((process) => {
            setRunning(true);
            window.sessionStorage.setItem('pid', JSON.parse(process).pid)
        }).catch((e) => console.log(e));
    }

    const changeButtonClickHandler = () => {
        setLoggedIn(false);
        setInfo('Login to play')
        window.sessionStorage.removeItem('mode');
    }

    const registrationButtonClickHandler = () => {
        window.something.registration();
    }

    const collectFormData = (e, form) => {
        e.preventDefault();
        let formData = Object.fromEntries(new FormData(form));
        window.something.login(formData).then((answer) => {
            const result = JSON.parse(answer);
            setInfo(result.info);
            if (result.mode != 'error'){
                setLoggedIn(true);
                window.sessionStorage.setItem('mode', result.mode);
                window.localStorage.setItem('nickname', result.authData.name);
            }else return
        });
    }

    const offlineSwitch = () => {
        setOfflineMode(!offlineMode);
        passwordInputRef.current.value = '';
    }

    window.something.gameClosed(() => {
        setRunning(false);
        window.sessionStorage.removeItem('pid');
    });

    return (
        <div className="login">
            <p>{info}</p>
            <form  className={loggedIn?'form login__form form_disabled':'form login__form'} onSubmit={(e) => collectFormData(e,e.target)}>
                <input name="nickname" defaultValue={nickname} placeholder={nickname} className="form__input" type="text" />
                <input required ref={passwordInputRef} disabled={offlineMode}  name="password" placeholder="Password" className="form__input" type="password" />
                <button className='form__button' type="submit">Login</button>
                <button className='form__button' type="button" onClick={() => offlineSwitch()}>{offlineMode?"Online":"Offline"}</button>
                <button className='form__button' type="button" disabled={running} onClick={() => registrationButtonClickHandler()}>Registration</button>
            </form>

            {loggedIn && 
            <div className='login__buttons-wrapper'>
                <Button disabled={running} onClick={() => playButtonClickHandler()}>Play</Button>
                <Button disabled={running} onClick={() => changeButtonClickHandler()}>Change</Button>
                <Progress disabled={!running} status={props.progress}/> 
            </div>
            }
            
        </div> 
    );
}
 
export default Form;