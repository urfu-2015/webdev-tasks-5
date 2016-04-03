import React from 'react';
import {editTask} from '../actions';
import {removeTask} from '../actions';

export default ({text, id, store}) => {
    //обработчики событий touchStart, touchEnd

    return (
        <div className="task" id={id}>
            <div className="task__text" id={"text_" + id}>{text}</div>
        </div>
    );
};