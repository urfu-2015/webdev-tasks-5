export const getTodos = todos => {
    return {
        type: 'GET_TODOS',
        todos: todos
    };
};

export const addTodo = todo => {
    return {
        type: 'ADD_TODO',
        todo: todo
    };
};

export const selectTodo = id => {
    return {
        type: 'SELECT_TODO',
        selectedTodoId: id
    };
};

export const unselectTodo = id => {
    return {
        type: 'UNSELECT_TODO',
        unselectedTodoId: id
    };
};

export const deleteTodo = id => {
    return {
        type: 'DELETE_TODO',
        deletedTodoId: id
    };
};

export const editTodo = id => {
    return {
        type: 'EDIT_TODO',
        editingTodoId: id
    };
};

export const updateTodo = (id, newText) => {
    return {
        type: 'UPDATE_TODO',
        updatedTodoId: id,
        updatedTodoText: newText
    };
};
