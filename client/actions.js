const addTask = task => {
    return {
        type: 'ADD',
        task: task
    };
};

const deleteTask = id => {
    return {
        type: 'DELETE',
        id
    };
};

const renameTask = (id, text) => {
    return {
        type: 'RENAME',
        id,
        text
    };
};

const refreshTasks = tasks => {
    return {
        type: 'REFRESH',
        tasks: tasks
    };
};

export const actions = {
    addTask,
    deleteTask,
    renameTask,
    refreshTasks
};
