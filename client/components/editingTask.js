"use strict";

import React from 'react';
import {tap} from './touchEvents';
import request from '../request';
import {getTaskId} from './task';
import {changeTask} from '../action';

export default ({key, text, store}) => {
    function saveChange(e) {
        tap(e, target => {
            let id = getTaskId(target);
            request('POST', '/tasks/' + id, {text: target.parentElement.children[0].value},
                (err, task) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    store.dispatch(changeTask(id, task));
                });
        });
    }

    return (<div className="task_edit" key={key}>
        <input className="task__edit-field" defaultValue={text}/>
        <button className="task__save-edit" onTouchStart={saveChange}>Сохранить</button>
    </div>);
};
