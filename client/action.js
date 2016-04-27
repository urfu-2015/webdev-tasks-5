"use strict";

export const addTask = task => {
    return {
        type: 'ADD_TASK',
        task
    };
};

export const updateTasks = tasks => {
    return {
        type: 'UPDATE_TASKS',
        tasks
    };
};

export const editTask = taskId => {
    return {
        type: 'EDIT_TASK',
        taskId
    };
};

export const changeTask = (id, task) => {
    return {
        type: 'CHANGE_TASK',
        id,
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

export const moveTask = (id, pageX, pageY) => {
    return {
        type: 'MOVE_TASK',
        id,
        pageX,
        pageY
    };
};

export const changeTaskPosition = (id, direction) => {
    return {
        type: 'CHANGE_TASK_POSITION',
        id,
        direction
    };
};

export const endMove = () => {
    return {
        type: 'END_MOVE_TASK'
    };
};
