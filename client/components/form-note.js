import React from 'react';
import {changeNote} from '../actions';

export default ({value, store}) => {

    function onClick (event) {
        event.preventDefault();
        let newValue = event.target.parentNode.firstChild.value;
        store.dispatch(changeNote(value, newValue));
    }

    return (
        <form className="change-form">
            <textarea defaultValue={value}></textarea>
            <button className="form-button_submit" onClick={onClick}>Изменить</button>
        </form>
    )
}
