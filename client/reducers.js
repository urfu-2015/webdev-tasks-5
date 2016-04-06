const initialState = {
    todos: []
};

exports.todosApp = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'ADD_TODO':
            return {
                todos: state.todos.concat([action.todo])
            };

        case 'DELETE_TODO':
            var todoIndex = state.todos.findIndex((todo) => {
                return todo._id === action.id;
            });
            var todos = state.todos.slice();

            todos.splice(todoIndex, 1);

            return {
                todos: todos
            };

        case 'CHANGE_TODO':
            var todoIndex = state.todos.findIndex((todo) => {
                return todo._id === action.todo._id;
            });
            var todos = state.todos.slice()

            todos[todoIndex] = action.todo;

            return {
                todos: todos
            };

        case 'LOAD_TODOS':
            return {
                todos: action.todos
            };

        case 'CLEAR_TODOS':
            return initialState;

        default:
            return state;
    }
};
