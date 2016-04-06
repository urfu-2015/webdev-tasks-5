import React from 'react';
import Note from './note';

export default ({notes, swipedNoteId, store}) => {
    return (
        <ul className="notes">
        {notes.map(note => (
            <Note
                key={note.id}
                task={note.task}
                id={note.id}
                swipedNoteId={swipedNoteId}
                store={store} />
        ))}
    </ul>
    );
};
