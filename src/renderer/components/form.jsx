import React from 'react';
import Button from './button';
import './form.sass';

const Form = (props) => {
    return (
        <form action="" className="form">
            <ul className='form__root'>
                {props.content.map((category) => {
                    return (
                        <li className="form__category">
                            <h2 className='form__categoryTitle'>
                                {category.title.ru}
                            </h2>

                            <ul className='form__categoryContent'>
                                {category.adjustments &&
                                    category.adjustments.map((adjustment) => {
                                        return(
                                            <li className='form__categoryItem'>
                                                {adjustment}
                                            </li>
                                        )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>

            {props.confirmText &&
                <Button className='button button_color-red button_align-center form__button'>{props.confirmText.ru}</Button>
            }
        </form>
    );
}
 
export default Form;