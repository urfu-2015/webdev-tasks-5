import React from 'react';
import {fetchAddNote} from '../actions';

export default ({formClassName, store}) => {
    function onSubmit (event) {
        event.preventDefault();
        let input = event.target.firstChild;
        if (!input.value.trim()) {
            return
        }

        store.dispatch(fetchAddNote(input.value));
        input.value = '';
    }
    return (
    <form name="newNote" className={"new-note__form new-note-form " + formClassName} onSubmit={onSubmit}>
        <input name="task" className="new-note-form__input" placeholder="Новая заметка.." />
        <button type="submit" className="new-note-form__button">Сохранить</button>
    </form>
)};
