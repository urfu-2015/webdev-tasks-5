import React from 'react';
import {selectNote} from '../actions';

export default ({task, id, store}) => {
    function onClick(event) {
        event.preventDefault();

        var url = event.target.getAttribute('href');
        var selectedNotetask = url.split('/').pop();

        store.dispatch(selectNote(selectedNotetask));
    }

    return (
        <li id={id} className="notes__item notes-item">
            <div id={"task-" + id} className="notes-item__task" onClick={onClick}>
                {task}
            </div>
            <div className="notes-item__delete notes-item__delete_invisible">
            </div>
        </li>
    );
};
