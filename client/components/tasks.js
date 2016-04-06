"use strict";

import React from 'react';
import Task from './task';

export default ({tasks, store}) => (
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
