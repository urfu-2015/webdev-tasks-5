import React from 'react';
import Task from './task';

export default ({tasks, store}) => (
    <div className="tasks-container">
        {tasks.map(task => (
            <Task
                text={task.text}
                id={task.id}
                store={store}
            />
        ))}
    </div>
);