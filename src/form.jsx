import React from 'react';
import Button from './button.jsx';
import './form.sass';

const Form = () => {
    return (
        <form className="form">
            <input onChange={(e) => window.something.changeNickname(e.target.value)} className="form__input" type="text" placeholder="Nickname"/>
            <Button onClick={() => window.something.play()}>Play</Button>
        </form>
    );
}
 
export default Form;