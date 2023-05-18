import React from 'react';
import Button from './button.jsx';
import './form.sass';

const Form = () => {
    return (
        <form className="form">
            <input className="form__input" type="text" placeholder="Nickname"/>
            <Button>Play</Button>
        </form>
    );
}
 
export default Form;