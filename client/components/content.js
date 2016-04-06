import React, { Component} from 'react';
import Header from './header';
import AddButton from './addButton';
import Notes from './notes';

export default ({store}) => {
    const {notes, selectedNoteId, swipedNoteId} = store.getState();

    return (
        <div>
            <Header />
            <Notes notes={notes} swipedNoteId={swipedNoteId} store={store} />
            <AddButton store={store} />
        </div>
    );

};
