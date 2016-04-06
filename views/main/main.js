require('./main.css');
var check = require('../../lib/checkTouch');
import React from 'react';
import ReactDom from 'react-dom';
import Tasks from '../../blocks/tasks';

var classes = {
    input: 'list__task__input__num_',
    todo: 'list__task__todo__num_',
    remove: 'remove__num_',
    save: 'list__task__submit',
    add: 'list__task__add',
    taskDiv: 'list__task__num_',
    loader: 'header__loader',
    header: 'header'
}

var tasks = [];
var addButton = true;
refresh();

function render() {
    ReactDom.render(
        <Tasks tasks={tasks} addButton={addButton} />,
        document.getElementById('root'), function() {
        addEventListeners();
        setTimeout(loader, 500, false);
    });
}

function addEventListeners() {
    addButtonEvents();
    toDoEvents();
    saveButtonEvents();
    removeButtonEvents();
}

function addButtonEvents() {
    var addButton = document.getElementsByClassName(classes.add)[0];
    if (addButton) {
        addButton.addEventListener('click', addButtonClick);
    }
}

function removeButtonEvents() {
    var deleteButtons = document.querySelectorAll('[class^=' + classes.remove + ']');
    if (deleteButtons.length) {
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener('click', removeTask);
        };
    }
}

function toDoEvents() {
    var tasksTodo = document.querySelectorAll('[class^=' + classes.todo + ']');
    if (tasksTodo.length) {
        for (var i = 0; i < tasksTodo.length; i++) {
            tasksTodo[i].addEventListener('touchend', todoTouchEnd);
            tasksTodo[i].addEventListener('touchmove', todoTouchMove);
        };
    }
}

function saveButtonEvents() {
    var saveButtons = document.getElementsByClassName(classes.save);
    if (saveButtons.length) {
        for (var i = 0; i < saveButtons.length; i++) {
            saveButtons[i].addEventListener('click', saveTask);
        };
    }
}

function saveTask(event) {
    var task = createTaskObj(event);
    if (task.orderNum === '-1') {
        addButton = true;
        addTask(task);
    } else {
        tasks[task.orderNum].change = false;
        updateTask(task);
    }
}
 
function addTask(task) {
    var params = createPOSTparams(task);
    fetch('/addTask', params
    ).then(
        response => response.json()
    ).then(
        newTask => {
            tasks.push(newTask);
            render();
        },
        err => console.log(err)
    );
}

function updateTask(task) {
    var params = createPOSTparams(task);
    fetch('/updateTask', params
    ).then(
        response => response.json()
    ).then(
        newTask => {
            tasks[Number(newTask.orderNum)].todo = newTask.todo;
            render();
        },
        err => console.log(err)
    )
}

function removeTask(event) {
    var task = createTaskObj(event);
    var params = createPOSTparams(task);
    fetch('/removeTask', params).then(
        () => {
            removeTaskLocal(task.orderNum);
            render();
        },
        err => console.log(err)
    );
}

function createPOSTparams(task) {
    var params = {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    return params;
}

function createTaskObj(event) {
    var num = getNumFromClassName(event.target.parentNode.className);
    var input = document.getElementsByClassName(classes.input + num)[0] || {};
    var task = {
        orderNum: num,
        todo: input.value
    };
    return task;
}

function removeTaskLocal(orderNum) {
    tasks.splice(orderNum, 1);
    for (var i = 0; i < tasks.length; i++) {
        tasks[i].orderNum = i;
    };
}

function refresh() {
    loader(true);
    fetch('/getAll').then(
        response =>  response.json(),
        err => console.log('ERROR' + err)
    ).then(
        data => {
            tasks = data.allTasks;
            addButton = true;
            render();
        }
    );
}

function loader(display) {
    var loader = document.getElementsByClassName(classes.loader)[0];
    if (display) {
        loader.style.display = "block";
    } else {
        loader.style.display ="none";
    }
}

function addButtonClick(event) {
    addButton = false;
    render();
}

function todoTouchEnd(event) {
    if (check.isTap(start, event)) {
        var targetClass = event.target.className;
        var num = getNumFromClassName(targetClass);
        tasks[num].change = true;
        render();
    }
}

function todoTouchMove(event) {
    var targetClass = event.target.className;
    var num = getNumFromClassName(targetClass);
    if (check.isLeftSwipe(start, event)) {
        tasks[num].remove = true;
    } else if (check.isRightSwipe(start, event)) {
        tasks[num].remove = false;
    }
    render();
}

function getNumFromClassName(className) {
    return className.split('num_').pop();
}

var ldelay;
var start = {};

document.addEventListener('touchstart', function(event) {
    if (event.targetTouches.length > 1) {
        return;
    }
    ldelay = new Date(); 
    start.x = event.changedTouches[0].pageX;
    start.y = event.changedTouches[0].pageY;
}, false);

document.addEventListener('touchend' , function(event) {
    if (check.isDownSwipe(start, event)) {
        refresh();
    }
}, false) 

