"use strict";

const initialState = {
    tasks: [],
    isUpdating: false,
    isAddNewTaskFormVisible: false,
    deleteButtonOnTask: null,
    editingTaskId: null,
    movingTask: {id: null}
};

exports.taskApp = (state, action) => {
    state = Object.assign(state || initialState);
    switch (action.type) {
        case 'ADD_TASK':
            var newTask = action.task;
            state.tasks.forEach(task => {
                if (task.position >= newTask.position) {
                    ++task.position;
                }
            });
            state.tasks.splice(newTask.position, 0, newTask);
            return state;
        case 'UPDATE_TASKS':
            state.tasks = action.tasks;
            state.isUpdating = false;
            return state;
        case 'EDIT_TASK':
            state.isAddNewTaskFormVisible = false;
            state.deleteButtonOnTask = null;
            state.editingTaskId = action.taskId;
            return state;
        case 'CHANGE_TASK':
            state.isAddNewTaskFormVisible = false;
            state.editingTaskId = null;
            var task = getTaskById(action.id);
            if (!task) {
                console.error('Не найдена задача');
                return state;
            }
            state.tasks.splice(task.position, 1, action.task);
            return state;
        case 'REMOVE_TASK':
            var removingTask = getTaskById(state.deleteButtonOnTask);
            if (!removingTask) {
                console.error('Не найдена задача');
                return state;
            }
            state.tasks.splice(removingTask.position, 1);
            state.deleteButtonOnTask = null;
            return state;
        case 'SHOW_ADD_TASK_FORM':
            state.editingTaskId = null;
            state.deleteButtonOnTask = null;
            state.isAddNewTaskFormVisible = true;
            return state;
        case 'HIDE_ADD_TASK_FORM':
            state.isAddNewTaskFormVisible = false;
            return state;
        case 'SHOW_DELETE_BUTTON':
            state.editingTaskId = null;
            state.isAddNewTaskFormVisible = false;
            state.deleteButtonOnTask = action.taskId;
            return state;
        case 'REMOVE_DELETE_BUTTON':
            state.deleteButtonOnTask = null;
            return state;
        case 'TURN_UPDATING_ON':
            state.deleteButtonOnTask = null;
            state.isAddNewTaskFormVisible = false;
            state.editingTaskId = null;
            state.isUpdating = true;
            return state;
        case 'MOVE_TASK':
            state.deleteButtonOnTask = null;
            state.isAddNewTaskFormVisible = false;
            state.editingTaskId = null;
            state.movingTask = {
                id: action.id,
                pageX: action.pageX,
                pageY: action.pageY
            };
            return state;
        case 'CHANGE_TASK_POSITION':
            var tasks = state.tasks;
            var changingTask = getTaskById(action.id);
            if (!changingTask) {
                console.error('Не найдена задача');
                return state;
            }
            var position = changingTask.position;
            var dir = action.direction;
            if (dir > 0) {
                if (position === tasks.length - 1) {
                    return state;
                }
                ++changingTask.position;
                --tasks[position + 1].position;
            } else {
                if (position === 0) {
                    return state;
                }
                --changingTask.position;
                ++tasks[position - 1].position;
            }
            tasks.splice(position, 1);
            tasks.splice(position + dir, 0, changingTask);
            state.movingTask.pageY += dir * 40;
            return state;
        case 'END_MOVE_TASK':
            state.movingTask = {id: null};
            return state;
        default:
            return state;
    }

    function getTaskById(id) {
        return state.tasks.find(task => task.id === id);
    }
};
