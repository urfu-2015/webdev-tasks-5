'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import Task from '../../../client/task/task.js';
import AdditionForm from '../../../client/add_task_form/add_task_form.js';
import {reducers} from '../../../client/reducers.js';
import {actions} from '../../../client/actions.js';
import {userInterface} from './../../../client/interface.js';

export let store;

init();

function init() {
    renderAdditionForm();
    var tasks = [];
    var req = new XMLHttpRequest();

    req.open('PATCH', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send();
    req.onreadystatechange = function () {
        if (req.status === 200 && req.readyState === 4) {
            var res = JSON.parse(req.responseText);

            res.forEach((item) => {
                tasks.push({
                    id: item.id,
                    text: item.text
                });
            });
            store = createStore(reducers, tasks);
            store.subscribe(renderTasks);
            renderTasks();
        }
    };
}

function renderTasks() {
    ReactDom.render(
        <Task store={store} />,
        document.getElementsByClassName('tasks-list')[0]
    );
    onLoad();
}

function renderAdditionForm() {
    ReactDom.render(
        <AdditionForm />,
        document.getElementsByClassName('add-task')[0]
    );
}

function onLoad() {
    attachEventsToBody();
    setElementsInitialPos();
}

function attachEventsToBody() {
    var elements = document.getElementsByTagName('body')[0];

    elements.addEventListener('touchstart', onTouchStart, false);
    elements.addEventListener('touchmove', onTouchMove, false);
    elements.addEventListener('touchend', onTouchEnd, false);
}

function setElementsInitialPos() {
    var content = document.getElementsByClassName('content')[0];
    var refreshPic = document.getElementsByClassName('refresh')[0];
    content.initialPos = content.offsetTop;
    refreshPic.initialPos = refreshPic.offsetTop;
}

function onTouchStart(event) {
    var element = event.target;

    element.moveStart = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
    };

    element.refreshed = false;
    if (element.parentElement.nodeName !== 'FORM' && element.nodeName !== 'FORM') {
        userInterface.closeForms();
    }
}

function onTouchMove(event) {
    var curTargTouch = event.targetTouches[event.targetTouches.length - 1].pageY;
    var element = event.target;

    if (window.scrollY === 0 && curTargTouch > element.moveStart.y && !element.refreshed) {
        var content = document.getElementsByClassName('content')[0];
        var refreshPic = document.getElementsByClassName('refresh')[0];
        var delta = curTargTouch - element.moveStart.y;

        content.style.top = `${(delta + content.initialPos)}px`;
        refreshPic.style.top = `${(delta + refreshPic.initialPos)}px`;
        if (curTargTouch >= element.moveStart.y + window.screen.availHeight / 3) {
            refresh();
            element.refreshed = true;
        }
    }
}

function onTouchEnd(event) {
    var element = event.target;
    var yDif = event.changedTouches[0].pageY - element.moveStart.y;
    var xDif = event.changedTouches[0].pageX - element.moveStart.x;

    if (element.classList[0] === 'task__text') {
        if (Math.abs(yDif) <= element.offsetHeight && xDif < 0) {
            userInterface.showDeleteButton(event);
        }
    }
    if (!element.refreshed) {
        userInterface.hideRefreshAnimation();
    }
}

function refresh() {
    var tasks = document.getElementsByClassName('task');
    var ids = [];

    Array.prototype.forEach.call(tasks, function (item) {
        ids.push(Number(item.dataset.id));
    });
    var req = new XMLHttpRequest();

    req.open('PATCH', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({ids}));
    req.onreadystatechange = function () {
        if (req.status === 200 && req.readyState === 4) {
            var res = JSON.parse(req.responseText);

            userInterface.hideRefreshAnimation();
            store.dispatch(actions.refreshTasks(res));
        }
    };
}
