import React from 'react';

export default ({store, name}) => {
    var {notes, saveForm, selectedNote} = store.getState();

    if (saveForm && name === selectedNote) {
        return (
            <form method="POST" action="/change-note" className="save">
                <input defaultValue={name} type="text" className="save__text"/>
                <input type="submit" value="Save" className="save__btn"/>
            </form>
        );
    } else {
        return (
            <p className="container__item__text">{name}</p>
        );
    }
};
