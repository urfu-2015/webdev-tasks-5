const initialState = {
    todos: [],
    selectedTodoId: null,
    editingTodoId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS':
            return {
                todos: action.todos.reverse(),
                selectedTodoId: state.selectedTodoId,
                editingTodoId: state.editingTodoId
            };
        case 'ADD_TODO':
            return {
                todos: [action.todo, ...state.todos],
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
                todos: state.todos.filter(todo => {
                    return todo.id !== action.deletedTodoId;
                }),
                selectedTodoId: null,
                editingTodoId: null
            };
        case 'EDIT_TODO':
            return {
                todos: state.todos,
                selectedTodoId: null,
                editingTodoId: action.editingTodoId
            };
        case 'UPDATE_TODO':
            return {
                todos: state.todos.map(todo => {
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
