export const addTodo = todo => {
    return {
        type: 'ADD_TODO',
        todo: todo
    };
};

export const deleteTodo = id => {
    return {
        type: 'DELETE_TODO',
        id: id
    };
};

export const changeTodo = todo => {
    return {
        type: 'CHANGE_TODO',
        todo: todo
    };
};

export const loadTodos = todos => {
    return {
        type: 'LOAD_TODOS',
        todos: todos
    };
};

export const clearTodos = () => {
    return {
        type: 'CLEAR_TODOS'
    }
}