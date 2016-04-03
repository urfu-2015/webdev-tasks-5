import React from 'react';
import Header from './header';
import CreateNote from './createNote';
import Notes from './notes';

export default ({store}) => {
    const {notes, selectedNoteId} = store.getState();

    return (
        <div>
            <Header />
            <Notes notes={notes} store={store} />
            <CreateNote />
        </div>
    );
};
