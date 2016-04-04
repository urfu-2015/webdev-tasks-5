require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {tasksApp} from '../../../client/reducers';
import Main from '../../../client/components/index';
import {addNote} from '../../../client/actions';

const store = createStore(tasksApp);

function render() {
    ReactDom.render(
        <Main store={store} />,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);
