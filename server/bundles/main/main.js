require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Content from '../../../client/components/content';
import {addNote} from '../../../client/actions';
import {todoApp} from '../../../client/reducers';

const store = createStore(todoApp);

function render() {
    ReactDom.render(
        <Content store={store} />,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);

fetch('/todos')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        data.notes.forEach(note => {
            store.dispatch(addNote(note));
        });
    });
