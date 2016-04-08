"use strict";

import React from 'react';
import Task from './task';

export default ({tasks, store}) => {
    if (tasks.length === 0) {
        return <div>Задач нет</div>
    }
    return (
        <div className="tasks">
            {tasks.map(task => (
                <Task
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    store={store}
                />
            ))}
        </div>
    );
}
