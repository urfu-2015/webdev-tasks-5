"use strict";

export const addTask = task => {
    return {
        type: 'ADD_TASK',
        task
    };
};

export const removeTask = task => {
    return {
        type: 'REMOVE_TASK',
        task
    };
};

export const showAddTaskForm = () => {
    return {
        type: 'SHOW_ADD_TASK_FORM'
    };
};

export const hideAddTaskForm = () => {
    return {
        type: 'HIDE_ADD_TASK_FORM'
    };
};

export const showDeleteButton = taskId => {
    return {
        type: 'SHOW_DELETE_BUTTON',
        taskId: taskId
    };
};

export const removeDeleteButton = () => {
    return {
        type: 'REMOVE_DELETE_BUTTON'
    };
};

export const turnUpdatingOn = () => {
    return {
        type: 'TURN_UPDATING_ON'
    };
};

export const turnUpdatingOff = () => {
    return {
        type: 'TURN_UPDATING_OFF'
    };
};
