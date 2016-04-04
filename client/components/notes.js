import React from 'react';
import Note from './note';

export default ({notes}) => {
    return (
    <section className="task-container">
        {notes.map(note => (
            <Note task={note.text} id={note.id} />
        ))}
    </section>
    );
};
