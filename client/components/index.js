import React from 'react';
import Header from './header';
import Notes from './notes';
import addNote from './addNote';

export default (store) => {
    const {notes, selectedNoteId} = store.getState();
    return (
        <div>
            <Header />

        </div>
    );
}
