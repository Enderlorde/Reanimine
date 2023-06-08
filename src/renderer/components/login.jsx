import React from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Progress from './progress.jsx';
import Button from './button.jsx';
import './login.sass';
import './form.sass';

const Form = (props) => {

    const [nickname, setNickname] = useState();
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [offlineMode, setOfflineMode] = useState(false);
    const [info, setInfo] = useState('Login or register to play');

    const passwordInputRef = useRef();
 
    useEffect(() =>{
        const savedNickname = window.localStorage.getItem('nickname'); 
        const savedMode = window.sessionStorage.getItem('mode');
    
        if (savedNickname) 
        {
            setNickname(savedNickname);
            if(savedMode){
                setInfo(`${savedMode} mode as ${savedNickname}`);
            }
        }
        if (savedMode){
            setLoggedIn(true)
        }
    }, []);

  

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

    return (
        <div className="login">
            <p>{info}</p>
            <form  className={loggedIn?'form login__form form_disabled':'form login__form'} onSubmit={(e) => collectFormData(e,e.target)}>
                <input name="nickname" defaultValue={nickname} placeholder={nickname} className="form__input" type="text" />
                <input required ref={passwordInputRef} disabled={offlineMode}  name="password" placeholder="Password" className="form__input" type="password" />
                <button className='form__button' type="submit">Login</button>
                <button className='form__button' type="button" onClick={() => offlineSwitch()}>{offlineMode?"Online":"Offline"}</button>
                <button className='form__button' type="button" disabled={props.running} onClick={() => registrationButtonClickHandler()}>Registration</button>
            </form>

            {loggedIn && 
            <div className='login__buttons-wrapper'>
                <Button disabled={props.running} onClick={() => props.playHandler()}>Play</Button>
                <Button disabled={props.running} onClick={() => changeButtonClickHandler()}>Change</Button>
                <Progress disabled={!props.running} status={props.progress}/> 
            </div>
            }
            
        </div> 
    );
}

Form.propTypes = {
    progress: PropTypes.shape({
        total: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }),
    playHandler: PropTypes.func,
    running: PropTypes.bool
}

export default Form;