const initialState = {
    todos: [],
    selectedTodo: null,
    swipedTodo: null,
    reloadTodos: null,
    shiftX: 0,
    shiftY: 0
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
                reloadTodos: null,
                shiftX: state.shiftX,
                shiftY: state.shiftY
            };
        case 'DELETE_TODO':
            socket.emit('delete todo' , action.todo);
            state.todos.splice(action.todo, 1);
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: null,
                reloadTodos: null,
                shiftX: state.shiftX,
                shiftY: state.shiftY
            };
        case 'SELECT_TODO':
            return {
                todos: state.todos,
                selectedTodo: action.selectedTodo,
                swipedTodo: null,
                reloadTodos: null,
                shiftX: state.shiftX,
                shiftY: state.shiftY
            };
        case 'CHANGE_TODO':
            socket.emit('change todo' , {old: action.todo, new: action.newTodoValue});
            state.todos[action.todo] = action.newTodoValue;
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: null,
                shiftX: state.shiftX,
                shiftY: state.shiftY
            };
        case 'SHOW_DELETE_TODO':
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: action.todo,
                reloadTodos: state.reloadTodos,
                shiftY: state.shiftY
            };
        case 'HIDE_DELETE_TODO':
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: null,
                reloadTodos: null,
                shiftX: state.shiftX,
                shiftY: state.shiftY
            };
        case 'SHOW_RELOAD_TODOS' :
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: true,
                shiftX: state.shiftX,
                shiftY: 0
            };
        case 'SHOW_UPDATE_TODOS' :
            return {
                todos: state.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: null,
                shiftX: state.shiftX,
                shiftY: state.shiftY
            };
        case 'INIT_TODOS' :
            return {
                todos: action.todos,
                selectedTodo: null,
                swipedTodo: null,
                reloadTodos: null,
                shiftX: state.shiftX,
                shiftY: state.shiftY
            };
        case 'MOVE_DELETE_TODO' :
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: action.todo,
                reloadTodos: state.reloadTodos,
                shiftX: action.shiftX,
                shiftY: state.shiftY
            };
        case 'MOVE_RELOAD' :
            return {
                todos: state.todos,
                selectedTodo: state.selectedTodo,
                swipedTodo: state.swipedTodo,
                reloadTodos: true,
                shiftX: state.shiftX,
                shiftY: action.shiftY
            };
        default:
            return state;
    }
};