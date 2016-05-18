
export const addTodo = todo => {
    return {
        type: 'ADD_TODO',
        todo
    };
};

export const deleteTodo = todoId => {
    return {
        type: 'DELETE_TODO',
        todoId
    };
};

export const editTodo = todo => {
    return {
        type: 'EDIT_TODO',
        todo
    };
};
