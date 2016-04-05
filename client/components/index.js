import React from 'react';
import Header from './header';
import Notes from './notes';
import AddNote from './addNote';

export default ({store}) => {
    const {notes, selectedNoteId} = store.getState();
    return (
        <div>
            <Header />
            <Notes notes={notes} store={store} />
            <AddNote />
        </div>
    );
};
