require('./main.css');
var check = require('../../lib/checkTouch');
import React from 'react';
import ReactDom from 'react-dom';
import Main from '../../blocks/main';

var commonStaff = {};
var handler = {};

commonStaff.render = render;
commonStaff.tasks = [];
commonStaff.addButton = true;
commonStaff.start = {};

handler.remove = removeTask;
handler.save = saveTask;
handler.reorder = reorder;

refresh();

function render() {
    ReactDom.render(
        <Main commonStaff={commonStaff} handler={handler}/>,
        document.getElementById('root'), function() {
        setTimeout(loader, 500, false);
    });
}

function saveTask(event) {
    var task = createTaskObj(event);
    if (task.orderNum === '-1') {
        commonStaff.addButton = true;
        if (task.todo.length) {
            addTask(task);
        } else {
            render();
        }
    } else {
        commonStaff.tasks[task.orderNum].change = false;
        updateTask(task);
    }
}

function reorder(oldNum, newNum) {
   // loader(true);
    var params = createPOSTparams({oldNum, newNum});
    fetch('/changeOrder', params)
    .then(() => {
        console.log('order change');
        refresh();
    })
    .catch(err => console.log(err));
}

function addTask(task) {
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
    .then(() => {
        removeTaskLocal(task.orderNum);
        render();
    })
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
    fetch('/getAll').then(
        response =>  response.json(),
        err => console.log('ERROR' + err)
    )
    .then(data => {
            commonStaff.tasks = data.allTasks;
            commonStaff.addButton = true;
            render();
        }
    );
}

function loader(display) {
    var loader = document.getElementsByClassName('loading')[0];
    if (display) {
        loader.style.display = "block";
    } else {
        loader.style.display ="none";
    }
}

document.addEventListener('touchstart', function(event) {
    if (event.targetTouches.length > 1) {
        return;
    }
    commonStaff.ldelay = new Date(); 
    commonStaff.start.x = event.changedTouches[0].pageX;
    commonStaff.start.y = event.changedTouches[0].pageY;
}, false);

document.addEventListener('touchend' , function(event) {
    if (check.isDownSwipe(commonStaff.start, event)) {
        refresh();
    }
}, false) 

