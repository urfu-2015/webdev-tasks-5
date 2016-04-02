/* global modules:false */

modules.define('api', function(provide) {
    // Worker для работы с api
    var apiWorker = {
        getTodoAll: () => {
            return fetch('/api/todos/', {
                credentials: 'same-origin'
            })
                .then(function (response) {
                    return response.json();
                })
        },
        addTodo: (text) => {
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
        },
        getTodo: (noteId) => {
            return fetch(`/api/todos/${noteId}`, {
                credentials: 'same-origin'
            })
                .then(function (response) {
                    return response.json();
                })
        },
        editTodo: (noteId, newText) => {
            return fetch(`/api/todos/${noteId}`, {
                credentials: 'same-origin',
                method: 'put',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                mode: 'cors',
                body: `text=${newText}`
            })
                .then(function (response) {
                    return response.json();
                })
        },
        deleteTodo: (noteId) => {
            return fetch(`/api/todos/${noteId}`, {
                credentials: 'same-origin',
                method: 'delete'
            })
                .then(function (response) {
                    return response.json();
                })
        }
    };
    provide(apiWorker);
});
