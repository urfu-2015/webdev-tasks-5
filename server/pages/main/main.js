"use strict";

require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import App from '../../../client/components/app';
import {addTask} from '../../../client/action';
import {taskApp} from '../../../client/reducer';
import request from '../../../client/request';

const store = createStore(taskApp);

function render() {
    ReactDom.render(
        <App store={store}/>,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);

request('GET', '/tasks', null, function (err, tasks) {
    if (err) {
        console.error(err);
        return;
    }
    tasks.forEach(task => store.dispatch(addTask(task)));
});
