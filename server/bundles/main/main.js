'use strict';

require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Main from '../../../client/components/main';
import {addNote} from '../../../client/actions';
import {todoApp} from '../../../client/reducers';

const store = createStore(todoApp);

function render() {
    ReactDom.render(
        <Main store={store} />,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);


// Первый раз сами пошлем, чтобы заполнить
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/notes', 'true');
xhr.send();
xhr.onreadystatechange = function() {

    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
        return;
    } else {
        const data = JSON.parse(xhr.responseText);
        data.notes.forEach(note => {
            store.dispatch(addNote(note));
        })
    }

};

