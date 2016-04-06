import React from 'react';
import Note from './note';
import DeletableNote from './deletable-note';
import FormNote from './form-note';

export default ({store}) => {
    const  {notes, selectedNoteName, deletableNoteName} = store.getState();
    return (
        <div className="container">
            {notes.map(value => (
                <div className="row">
                    {(value === selectedNoteName) ?
                        <FormNote value={value} store={store} />
                        : null
                    }
                    {(value === deletableNoteName) ?
                        <DeletableNote value={value} store={store} />
                        : null
                    }
                    {((value !==selectedNoteName) && (value !== deletableNoteName)) ?
                        <Note value={value} store={store} />
                        : null
                    }
                </div>
            ))}
        </div>
    );
}
