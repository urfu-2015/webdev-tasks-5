require('./index.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Index from '../../client/components/index';
import {getListTodo, addTodo, showDelete, hideDelete} from '../../client/actions';
import {todoApp} from '../../client/reducers';

import {sendRequest} from '../../client/modules/http';
import {swipeEvent, tapEvent} from '../../client/modules/touch';

const store = createStore(todoApp);

const main = document.querySelector('.main-container');
const wrapper = document.querySelector('.wrapper');
const reload = document.querySelector('.reload');
const addButton = document.querySelector('.main-container__button');

function render() {
    ReactDom.render(
        <Index store={store} />,
        wrapper
    );
}

store.subscribe(render);

function getList(error) {
    if (error) {
        console.error(error);
        return;
    }

    reload.style.display = 'block';
    setTimeout(sendRequest('GET', '/list', {}, function (error, data) {
        if (error) {
            console.error(error);
            return;
        }
        if (data.status.indexOf('OK') >= 0) {
            var action = getListTodo(data.content);
            store.dispatch(action);
            reload.style.display = 'none';
        }
    }), 0);
}

function addItemList(error) {
    if (error) {
        console.error(error);
        return;
    }

    var text = 'Новая заметка!';
    setTimeout(sendRequest('POST', '/list', {content: text}, function (error, data) {
        if (error) {
            console.error(error);
            return;
        }
        if (data.status.indexOf('OK') >= 0) {
            var action = addTodo(text);
            store.dispatch(action);
        }
    }), 0);
}

getList();

main.addEventListener('touchstart', function (event) {
    swipeEvent(event, 'down', getList)
});

addButton.addEventListener('touchstart', function (event) {
    tapEvent(event, addItemList);
});

