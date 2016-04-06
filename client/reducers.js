const initialState = {
    todos: [],
    selectedTodo: null,
    swipedTodo: null,
    reloadTodos: null
};

function sleep(ms) {
    var start = new Date().getTime(), expire = start + ms;
    while (new Date().getTime() < expire) { }
    return;
}

exports.TodoApp = (state, action) => {
    state = state || initialState;
    var socket = io.connect();
    switch (action.type) {
        case 'ADD_TODO':
            socket.emit('add todo' , action.todo);
            state.todos.unshift(action.todo);
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: state.swipedTodo,
                reloadTodos: null
            };
        case 'DELETE_TODO':
            socket.emit('delete todo' , action.todo);
            state.todos.splice(action.todo, 1);
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: null,
                reloadTodos: null
            };
        case 'SELECT_TODO':
            return {
                todos: state.todos,
                selectedTodo: action.selectedTodo,
                swipedTodo: null,
                reloadTodos: null
            };
        case 'CHANGE_TODO':
            socket.emit('change todo' , {old: action.todo, new: action.newTodoValue});
            state.todos[action.todo] = action.newTodoValue;
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: null
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
                swipedTodo: null,
                reloadTodos: null
            };
        case 'SHOW_RELOAD_TODOS' :
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: true
            };
        case 'SHOW_UPDATE_TODOS' :
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: null
            };
        case 'INIT_TODOS' :
            return {
                todos: action.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: null
            };
        default:
            return state;
    }
};