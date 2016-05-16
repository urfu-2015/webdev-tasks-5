'use strict';
const initialState = {
    todos: []
};

exports.todoApp = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case 'ADD_TODO':
            var todos = [action.todo, ...state.todos];
            return {
                todos
            };
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter(todo => todo.id !== action.todoId)
            };
        case 'EDIT_TODO':
            var todoStorageIndex = state.todos.findIndex(todo => todo.id === action.todo.id);
            state.todos[todoStorageIndex] = action.todo;
            return {
                todos: state.todos
            };
        default:
            return state;
    }
};
