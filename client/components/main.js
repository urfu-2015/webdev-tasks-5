import React from 'react';
import {addNote, selectChangeNote, selectDeleteNote, changeNote, deleteNote} from '../actions';

export default ({store}) => {
    const  {notes, selectedNoteName, deletableNoteName} = store.getState();
    return (
        <div className="container">
            {notes.map(note => (
                    <div className="row">
                        {(note === selectedNoteName) ?
                            <form className="change-form">
                                <textarea defaultValue={note}></textarea>
                                <button className="form-button_submit">Изменить</button>
                            </form>
                            : null
                        }
                        {(note === deletableNoteName) ?
                            <div>
                                <div className="note_for-delete">
                                    {note}
                                </div>
                                <div className="trash">
                                    Удалить
                                </div>
                            </div>
                            : null
                        }
                        {((note !==selectedNoteName) && (note !== deletableNoteName)) ?
                            <div className="note">
                                {note}
                            </div>
                            : null
                        }
                    </div>
            ))}
        </div>
    );
}
