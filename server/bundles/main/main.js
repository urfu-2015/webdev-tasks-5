require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import fetchJSONHelper from '../../../client/fetchJSONHelper';

import Todo from '../../../client/components/todos';

import {getTodos} from '../../../client/actions';
import todoApp from '../../../client/reducers';

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
    fetchJSONHelper('/todos/all', 'get')
    .then(data => {
        store.dispatch(getTodos(data.todos));
    });
}, 500);
