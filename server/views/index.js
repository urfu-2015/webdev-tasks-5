require('./index.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Page from '../../client/components/page';
import {AddTodo, InitTodos} from '../../client/actions';
import {TodoApp} from '../../client/reducers';


var socket = io();

socket.on('init todos', function(data) {
    store.dispatch(InitTodos(data.todos));
});

const store = createStore(TodoApp);

function render() {
    ReactDom.render(
        <Page store={store} />,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);