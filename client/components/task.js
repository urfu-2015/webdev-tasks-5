"use strict";

import React from 'react';
import {swipe, tap} from './touchEvents';
import {showDeleteButton, removeDeleteButton, editTask, changeTask} from '../action';
import DeleteButton from './deleteButton';
import request from '../request';

export default ({key, id, text, store}) => {
    function getTaskId(e) {
        return e.target.dataset.reactid
            .replace(/.+\$(\w+)\..+/, '$1');
    }
    function onTouchStart(e) {
        tap(e, e => store.dispatch(editTask(getTaskId(e))));
        swipe(e, 'left', e => {
                console.log('left swipe');
                store.dispatch(showDeleteButton(getTaskId(e)));
            }
        );
    }
    function removeDeleteButtonListener(e) {
        swipe(e, 'right', () => {
            store.dispatch(removeDeleteButton());
        });
    }
    function saveChange(e) {
        tap(e, e => {
            let id = getTaskId(e);
            request('POST', '/tasks/' + id, {text: e.target.parentElement.children[0].value},
                (err, task) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    store.dispatch(changeTask(id, task));
                });
        });
    }

    let state = store.getState();

    if (state.deleteButtonOnTask === id) {
        return <div className="task" key={key}>
            <div className="task__name" onTouchStart={removeDeleteButtonListener}>
                {text}
            </div>
            <DeleteButton store={store}/>
        </div>;
    }
    if (state.editingTaskId === id) {
        return <div className="task_edit" key={key}>
            <input className="task__edit-field" defaultValue={text}/>
            <button className="task__save-edit" onTouchStart={saveChange}>Сохранить</button>
        </div>
    }
    return <div className="task" key={key}>
        <div className="task__name" onTouchStart={onTouchStart}>
            {text}
        </div>
    </div>;
};
