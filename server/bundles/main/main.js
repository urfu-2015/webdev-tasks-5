require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {tasksApp} from '../../../client/reducers';
import Content from '../../../client/components/index';
import {addNote} from '../../../client/actions';

const store = createStore(tasksApp);

function render() {
    ReactDom.render(
        <Content store={store} />,
        document.getElementById('content')
    );
}

render();
store.subscribe(render);

