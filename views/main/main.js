require('./main.css');
var check = require('../../lib/checkTouch');
import React from 'react';
import ReactDom from 'react-dom';
import Main from '../../blocks/main';

var commonStaff = {};
var handler = {};

commonStaff.render = render;
commonStaff.tasks = [];
commonStaff.start = {};
commonStaff.edited = -2;
commonStaff.deleted = -2;

handler.remove = removeTask;
handler.save = saveTask;
handler.reorder = reorder;

refresh();

function render() {
    clearStyles();
    ReactDom.render(
        <Main commonStaff={commonStaff} handler={handler}/>,
        document.getElementById('root'), function () {
        setTimeout(loader, 500, false);
    });
}

function saveTask(event) {
    var task = createTaskObj(event);
    commonStaff.edited = -2;
    if (task.orderNum === '-1') {
        addTask(task);
    } else {
        updateTask(task);
    }
}

function reorder(oldNum, newNum) {
    var params = createPOSTparams({oldNum, newNum});
    fetch('/changeOrder', params)
    .then(() => refresh())
    .catch(err => console.log(err));
}

function addTask(task) {
    if (!task.todo.length) {
        render();
        return;
    }
    var params = createPOSTparams(task);
    fetch('/addTask', params)
    .then(response => response.json())
    .then(newTask => {
        commonStaff.tasks.push(newTask);
        render();
    })
    .catch(err => console.log(err));
}

function updateTask(task) {
    loader(true);
    var params = createPOSTparams(task);
    fetch('/updateTask', params)
    .then(response => response.json())
    .then(newTask => {
        if (newTask.todo) {
            commonStaff.tasks[Number(newTask.orderNum)].todo = newTask.todo;
        } else {
            removeTaskLocal(newTask.orderNum);
        }
        render();
    })
    .catch(err => console.log(err));
}

function removeTask(event) {
    var task = createTaskObj(event);
    var params = createPOSTparams(task);
    fetch('/removeTask', params)
    .then(() => refresh())
    .catch(err => console.log(err));
}

function createPOSTparams(obj) {
    var params = {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    return params;
}

function createTaskObj(event) {
    var num = event.target.getAttribute("data-num");
    var input = event.target.previousSibling || [];
    var task = {
        orderNum: num,
        todo: input.value
    };
    return task;
}

function removeTaskLocal(orderNum) {
    commonStaff.tasks.splice(orderNum, 1);
    for (var i = 0; i < commonStaff.tasks.length; i++) {
        commonStaff.tasks[i].orderNum = i;
    };
}

function refresh() {
    loader(true);
    clearStyles();
    fetch('/getAll')
    .then(response => response.json())
    .then(data => {
        commonStaff.tasks = data.allTasks;
        commonStaff.edited = -2;
        render();
    })
    .catch(err => console.log(err));
}

function clearStyles() {
    var elems = document.getElementsByClassName("task");
    for (var i = 0; i < elems.length; i++) {
        elems[i].firstElementChild.removeAttribute('style');
        elems[i].lastElementChild.removeAttribute('style');
    }
}

function loader(display) {
    var loader = document.getElementsByClassName('loading')[0];
    if (display) {
        loader.style.display = 'block';
    } else {
        loader.style.display = 'none';
    }
}

document.addEventListener('touchstart', function (event) {
    if (event.targetTouches.length > 1) {
        return;
    }
    commonStaff.ldelay = new Date();
    commonStaff.start.x = event.changedTouches[0].pageX;
    commonStaff.start.y = event.changedTouches[0].pageY;
}, false);

document.addEventListener('touchend', function (event) {
    if (check.isDownSwipe(commonStaff.start, event)) {
        refresh();
    }
}, false);
