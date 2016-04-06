import * as types from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'
// require('es6-promise').polyfill();

// export function addTodo(text) {
//     return {type: types.ADD_TODO, text}
// }

export function todoAdded(json) {
    return {
        type: types.TODO_ADDED,
        status: json.status,
        todo: json.userTodo
    }
}

export function addTodo(text) {
    return dispatch => {
        return fetch('/api/todos', {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `text=${text}`
        })
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                dispatch(todoAdded(json));
            })
    }
}

// export function deleteTodo(id) {
//     return {type: types.DELETE_TODO, id}
// }

export function todoDeleted(json) {
    return {
        type: types.TODO_DELETED,
        status: json.status,
        todo: json.userTodo
    }
}

export function deleteTodo(id) {
    return dispatch => {
        return fetch(`/api/todos/${id}`, {
            credentials: 'same-origin',
            method: 'delete'
        })
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                dispatch(todoDeleted(json));
            })
    }
}

// export function editTodo(id, text) {
//     return {type: types.EDIT_TODO, id, text}
// }

export function todoEdited(json) {
    return {
        type: types.TODO_EDITED,
        status: json.status,
        todo: json.userTodo
    }
}

export function editTodo(id, text) {
    return dispatch => {
        return fetch(`/api/todos/${id}`, {
            credentials: 'same-origin',
            method: 'put',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            mode: 'cors',
            body: `text=${text}`
        })
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                dispatch(todoEdited(json));
            })
    }
}

// export function invalidateReddit(reddit) {
//     return {
//         type: INVALIDATE_REDDIT,
//         reddit
//     }
// }

function requestTodos() {
    return {
        type: types.REQUEST_TODOS
    }
}

function receiveTodos(json) {
    return {
        type: types.RECEIVE_TODOS,
        status: json.status, // ok | failed
        todos: json.userTodo,
        receivedAt: Date.now()
    }
}

export function fetchTodos() {
    return dispatch => {
        dispatch(requestTodos());
        return fetch(`/api/todos/`, {
            credentials: 'same-origin'
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                return json;
            })
            .then(json => {
                dispatch(receiveTodos(json));
            })
    }
}

// function shouldFetchTodos(state) {
//     const posts = state.postsByReddit[reddit];
//     if (!posts) {
//         return true
//     }
//     if (posts.isFetching) {
//         return false
//     }
//     return posts.didInvalidate
// }
//
// export function fetchTodosIfNeeded() {
//     return (dispatch, getState) => {
//         if (shouldFetchTodos(getState())) {
//             return dispatch(fetchTodos())
//         }
//     }
// }
