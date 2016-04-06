"use strict";

import React from 'react';
import {hideAddTaskForm, addTask} from '../action';
import {tap} from './touchEvents';
import request from '../request';

export default ({store}) => {
    function onTouchStart(e) {
        tap(e, () => addNewTask(store));
    }

    function addNewTask(store) {
        var nameInput = document.getElementsByClassName('add-task__name')[0];
        if (nameInput.value === '') {
            store.dispatch(hideAddTaskForm());
            return;
        }
        store.dispatch(hideAddTaskForm());
        request('POST', '/tasks', {text: nameInput.value}, function (err, task) {
            if (err) {
                console.error(err);
                return;
            }
            store.dispatch(addTask(task));
        });
    }

    return (
        <div className="add-task">
            <input className="add-task__name"/>
            <button className="add-task__button" onTouchStart={onTouchStart}>Добавить</button>
        </div>
    );
};

