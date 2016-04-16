import React from 'react';
import Note from './navigation.jsx';

export default ({noteElement}) => (
    <div className="notes__wrapper">
        {noteElement.map(note => (
            <Note key={note.id} text={note.text} id={note.id} />
        ))}
    </div>
);
