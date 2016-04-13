import React from 'react';
import xhrRequest from '../client-request';
import {changeNote} from '../actions';
import {save} from '../client-request';

export default ({store, name}) => {
    var {selectedNote} = store.getState();

    const eventDecor = (event) => {
        event.preventDefault();

        save(selectedNote, store);
    };

    if (selectedNote && name === selectedNote) {
        return (
            <form method="POST" action="/change-note" className="save" onSubmit={eventDecor}>
                <input defaultValue={name} type="text" className="save__text"/>
                <input type="submit" value="Save" className="save__btn"/>
            </form>
        );
    }

    return (
        <p className="container__item_text">{name}</p>
    );
};
