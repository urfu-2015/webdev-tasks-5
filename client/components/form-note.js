import React from 'react';
import {changeNote, addNote} from '../actions';

export default ({value, store, type}) => {

    function onClick (event) {
        event.preventDefault();
        const newValue = event.target.parentNode.firstChild.value;
        let method;
        let json;
        const xhr = new XMLHttpRequest();

        if (type === 'change') {
            json = JSON.stringify({
                oldText: value,
                newText: newValue
            });
            method = 'POST';
        }
        if (type === 'add') {
            json = JSON.stringify({
                text: newValue
            });
            method = 'PUT';
        }

        xhr.open(method, '/api/notes', 'true');
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send(json);
        xhr.onreadystatechange = function() {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                return;
            } else {
                if (type === 'change') {
                    store.dispatch(changeNote(value, newValue));
                }
                if (type === 'add') {
                    store.dispatch(addNote(newValue));
                }
            }

        }
    }

    return (
        <form className="change-form">
            <textarea defaultValue={value} placeholder="Введите текст записи..."></textarea>
            <button className="form-button_submit" onClick={onClick}>Изменить</button>
        </form>
    )
}
