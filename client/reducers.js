const initialState = {
    todos: [],
    selectedTodo: null,
    swipedTodo: null
};

exports.TodoApp = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'ADD_TODO':
            state.todos.unshift(action.todo);
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: state.swipedTodo
            };
        case 'DELETE_TODO':
            state.todos.splice(action.todo, 1);
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: null
            };
        case 'SELECT_TODO':
            return {
                todos: state.todos,
                selectedTodo: action.selectedTodo,
                swipedTodo: null
            };
        case 'CHANGE_TODO':
            state.todos[action.todo] = action.newTodoValue;
            console.log("here");
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: null
            };
        case 'SHOW_DELETE_TODO':
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: action.todo
            };
        case 'HIDE_DELETE_TODO':
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: null
            };
        default:
            return state;
    }
};