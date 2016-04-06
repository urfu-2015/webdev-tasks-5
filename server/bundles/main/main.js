require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Todo from '../../../client/components/todo';
import {getTodos} from '../../../client/actions';
import {todoApp} from '../../../client/reducers';

const store = createStore(todoApp);

function render() {
    ReactDom.render(
        <Todo store={store} />,
        document.getElementById('root')
    );
}

store.subscribe(render);

setTimeout(() => {
    render();
    fetch('/todos/all', {method: 'get'})
        .then(response => {
            return response.json();
        })
        .then(data => {
            store.dispatch(getTodos(data.todos));
        });
}, 500);
