require('./todos.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import TodosContainer from '../../../client/components/todosContainer';
import {addTodo} from '../../../client/actions';
import {todoApp} from '../../../client/reducers';


const store = createStore(todoApp);

function render() {
    ReactDom.render(
        <TodosContainer store={store}/>,
        document.getElementById('root')
    );
}
render();
store.subscribe(render);

fetch('/api/todos')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        data.todos.forEach(todo => {
            store.dispatch(addTodo(todo));
        });
    });
