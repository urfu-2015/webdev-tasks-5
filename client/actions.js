export const addTask = task => {
    return {
        type: 'ADD_TASK',
        task: task
    }
};

export const editTask = task => {
    return {
        type: 'EDIT_TASK',
        text: task.text,
        selectedID: task.id
    }
};

export const removeTask = task => {
    return {
        type: 'REMOVE_TASK',
        selectedID: task.id
    }
};
