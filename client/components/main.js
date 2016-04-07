import React from 'react';
import Note from './note';
import DeletableNote from './deletable-note';
import FormNote from './form-note';
import ButtonAdd from './button-add';

export default ({store}) => {
    const  {notes, selectedNoteName, deletableNoteName, addButtonClicked} = store.getState();
    return (
        <div className="container">
            {notes.map(value => (
                <div className="row">
                    {(value === selectedNoteName) ?
                        <FormNote value={value} store={store} type="change" />
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
            {addButtonClicked ?
                <FormNote store={store} type="add" />
                :
                <ButtonAdd store={store} />
            }
        </div>
    );
}
