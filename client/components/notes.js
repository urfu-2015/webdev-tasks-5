import React from 'react';
import Note from './note';

export default ({notes, store}) => {
    return (
        <ul className="notes">
        {notes.map(note => (
            <Note key={note.task} task={note.task} id={note.id} store={store} />
        ))}
    </ul>
    );
};
