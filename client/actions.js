export const InitTodos = todos => {
    return {
        type: 'INIT_TODOS',
        todos: todos
    };
};
export const AddTodo = todo => {
    return {
        type: 'ADD_TODO',
        todo: todo
    };
};

export const SelectTodo = selectedTodo => {
    return {
        type: 'SELECT_TODO',
        selectedTodo: selectedTodo
    };
};

export const DeleteTodo = todo => {
    return {
        type: 'DELETE_TODO',
        todo: todo
    };
};

export const ChangeTodo = (todo, newTodoValue) => {
    return {
        type: 'CHANGE_TODO',
        todo: todo,
        newTodoValue: newTodoValue
    };
};

export const ShowDeleteTodo = (todo) => {
    return {
        type: 'SHOW_DELETE_TODO',
        todo: todo
    };
};

export const HideDeleteTodo = () => {
    return {
        type: 'HIDE_DELETE_TODO'
    }
};

export const ShowReloadTodos = () => {
    return {
        type: 'SHOW_RELOAD_TODOS'
    }
};

export const ReloadTodos = () => {
    return {
        type: 'SHOW_UPDATE_TODOS'
    }
};