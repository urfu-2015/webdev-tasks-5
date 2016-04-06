import {TODO_ADDED, TODO_DELETED, TODO_EDITED, RECEIVE_TODOS} from '../constants/ActionTypes'

const initialState = [
    // {
    //     id: 0,
    //     text: 'Use Redux',
    //     createdAt: 1459448312865
    // }
];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case TODO_ADDED:
            return [
                ...state,
                {
                    id: action.todo.id,
                    text: action.todo.text,
                    createdAt: action.todo.createdAt
                }
            ];

        case TODO_DELETED:
            if (action.status === 'ok') {
                console.log(action);
                return state.filter(todo =>
                    todo.id !== action.todo.id
                );
            } else {
                return state
            }

        case TODO_EDITED:
            if (action.status === 'ok') {
                return state.map(todo =>
                    todo.id === action.todo.id ?
                        Object.assign({}, todo, {text: action.todo.text}) :
                        todo
                );
            } else {
                return state
            }

        case RECEIVE_TODOS:
            if (action.status === 'ok') {
                var arr = [];
                for (var key in action.todos) {
                    arr.push(Object.assign({}, action.todos[key], {id: key}));
                }
                return arr;
            } else {
                return state
            }

        // case COMPLETE_TODO:
        //     return state.map(todo =>
        //         todo.id === action.id ?
        //             Object.assign({}, todo, {completed: !todo.completed}) :
        //             todo
        //     );
        //
        // case COMPLETE_ALL:
        //     const areAllMarked = state.every(todo => todo.completed)
        //     return state.map(todo => Object.assign({}, todo, {
        //         completed: !areAllMarked
        //     }));
        //
        // case CLEAR_COMPLETED:
        //     return state.filter(todo => todo.completed === false)

        default:
            return state
    }
}
