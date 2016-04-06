const initialState = {
    todos: [],
    selectedTodoId: null,
    editingTodoId: null
};

exports.todoApp = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'GET_TODOS':
            return {
                todos: action.todos.reverse(),
                selectedTodoId: state.selectedTodoId,
                editingTodoId: state.editingTodoId
            };
        case 'ADD_TODO':
            // Через чэйнинг не работает :<
            var tempVar = state.todos.concat();
            tempVar.unshift(action.todo);
            return {
                todos: tempVar,
                selectedTodoId: null,
                editingTodoId: null
            };
        case 'SELECT_TODO':
            return {
                todos: state.todos.concat(),
                selectedTodoId: action.selectedTodoId,
                editingTodoId: null
            };
        case 'UNSELECT_TODO':
            return {
                todos: state.todos.concat(),
                selectedTodoId: null,
                editingTodoId: null
            };
        case 'DELETE_TODO':
            return {
                todos: state.todos.concat().filter(todo => {
                    return todo.id !== action.deletedTodoId;
                }),
                selectedTodoId: null,
                editingTodoId: null
            };
        case 'EDIT_TODO':
            return {
                todos: state.todos.concat(),
                selectedTodoId: null,
                editingTodoId: action.editingTodoId
            };
        case 'UPDATE_TODO':
            return {
                todos: state.todos.concat().map(todo => {
                    if (todo.id === action.updatedTodoId) {
                        todo.text = action.updatedTodoText;
                    }
                    return todo;
                }),
                selectedTodoId: null,
                editingTodoId: null
            };
        default:
            return state;
    }
};
