"use strict";

const initialState = {
    tasks: [],
    isUpdating: false,
    isAddNewTaskFormVisible: false,
    deleteButtonOnTask: null
};

exports.taskApp = (state, action) => {
    state = Object.assign(state || initialState);
    switch (action.type) {
        case 'ADD_TASK':
            if (state.tasks.find(displayedTask => displayedTask.id === action.task.id)) {
                return state;
            }
            state.tasks = [action.task].concat(state.tasks);
            return state;
        case 'REMOVE_TASK':
            state.tasks.splice(state.tasks
                .map(task => task.id)
                .indexOf(state.deleteButtonOnTask), 1);
            state.deleteButtonOnTask = null;
            return state;
        case 'SHOW_ADD_TASK_FORM':
            state.isAddNewTaskFormVisible = true;
            return state;
        case 'HIDE_ADD_TASK_FORM':
            state.isAddNewTaskFormVisible = false;
            return state;
        case 'SHOW_DELETE_BUTTON':
            state.deleteButtonOnTask = action.taskId;
            return state;
        case 'REMOVE_DELETE_BUTTON':
            state.deleteButtonOnTask = null;
            return state;
        case 'TURN_UPDATING_ON':
            state.isUpdating = true;
            return state;
        case 'TURN_UPDATING_OFF':
            state.isUpdating = false;
            return state;
        default:
            return state;
    }
};
