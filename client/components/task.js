"use strict";

import React from 'react';
import {swipe, tap, longTap} from './touchEvents';
import {showDeleteButton, editTask, moveTask, changeTaskPosition, endMove} from '../action';
import TaskWithDeleteButton from './taskWithDeleteButton';
import EditingTask from './editingTask';
import request from '../request';

export const getTaskId = target => {
    return target.dataset.reactid
        .replace(/.+\$(\w+)\..+/, '$1');
};

export default ({key, id, text, store}) => {
    function onTouchStart(e) {
        tap(e, target => store.dispatch(editTask(getTaskId(target))));
        swipe(e, 'left', target => store.dispatch(showDeleteButton(getTaskId(target))));
        longTap(e, data => {
            store.dispatch(moveTask(getTaskId(data.target), data.pageX, data.pageY));
        });
    }

    let state = store.getState();

    function movingTask(e) {
        var offset = e.targetTouches[0].pageY - state.movingTask.pageY;
        var style = e.currentTarget.parentElement.style;
        style['margin-top'] = offset + 'px';
        style['margin-bottom'] = -offset + 'px';
        if (offset < -20) {
            store.dispatch(changeTaskPosition(getTaskId(e.currentTarget), -1));
            style['margin-top'] = '20px';
            style['margin-bottom'] = '-20px';
        }
        if (offset > 20) {
            store.dispatch(changeTaskPosition(getTaskId(e.currentTarget), 1));
            style['margin-top'] = '-20px';
            style['margin-bottom'] = '20px';
        }
    }

    function endMoving(e) {
        const style = e.currentTarget.parentElement.style;
        style.removeProperty('margin-top');
        style.removeProperty('margin-bottom');
        store.dispatch(endMove());
        const taskId = getTaskId(e.currentTarget);
        const task = state.tasks.find(task => task.id === taskId);
        request('POST', '/tasks/' + taskId, {position: task.position}, err => {
            if (err) {
                console.error(err);
            }
        });
    }

    if (state.deleteButtonOnTask === id) {
        return <TaskWithDeleteButton key={key} text={text} store={store}/>;
    }

    if (state.editingTaskId === id) {
        return <EditingTask key={key} text={text} store={store}/>;
    }

    if (state.movingTask.id === id) {
        return <div className="task_move" key={key}>
            <div className="task__name" onTouchMove={movingTask} onTouchEnd={endMoving}>
                {text}
            </div>
        </div>;
    }

    return <div className="task" key={key}>
        <div className="task__name" onTouchStart={onTouchStart}>
            {text}
        </div>
    </div>;
};
