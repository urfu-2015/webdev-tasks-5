require('./index.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import TodosPage from '../../../client/components/todosPage';
import {addTodo, clearTodos} from '../../../client/actions';
import {todosApp} from '../../../client/reducers';

import {request} from '../../../client/httpRequest';
import '../../../client/touchEvents';

const store = createStore(todosApp);

function render() {
    ReactDom.render(
        <TodosPage store={store} />,
        document.querySelector('#root')
    );
}
render();

store.subscribe(render);

function loadTodos () {
    request('GET', 'api/todos', null, (data) => {
        data.todos.forEach(todo => {
            store.dispatch(addTodo(Object.assign({}, todo, {
                isChanging: false,
                isDeleting: false
            })));
        });
    });
}

loadTodos();

document.addEventListener('scroll-load', (event) => {
    store.dispatch(clearTodos());
    loadTodos();
});
