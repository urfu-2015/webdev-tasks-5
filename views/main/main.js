require('./main.css');
var objCreater = require('./domObjectCreater.js');
var classes = objCreater.className;
var request = require('./serverRequest.js');

window.onload = function () {
    setTimeout(removeLoader, 500);
} ;

addEventListeners();

function addEventListeners() {
    var addButton = document.getElementsByClassName(classes.add)[0];
    if (addButton) {
        addButton.addEventListener('click', addButtonClick);
    }
    var tasksTodo = document.querySelectorAll('[class^="list__task__todo"]');
    if (tasksTodo.length) {
        tasksTodo.forEach(
            task => {
                task.addEventListener('touchend', todoTouchEnd);
                task.addEventListener('touchmove', todoTouchMove);
            }
        );
    }
}

function createTaskForm(num) {
	var taskDiv = getDivInList(num);
    var input = objCreater.getNewInput(num);
    var saveButton = objCreater.getSaveButton();
    saveButton.addEventListener('click', saveTask);
    taskDiv.innerHTML = '';
    taskDiv.appendChild(input);
	taskDiv.appendChild(saveButton);
    input.focus();
}

function saveTask(event) {
    var num = getNumFromClassName(event.target.parentNode.className);
    var input = document.getElementsByClassName(classes.input + num)[0];
    var task = {
        orderNum: num,
        todo: input.value
    };
    if (num === '-1') {
        addTask(task);
    } else {
        updateTask(task);
    }
}

function addTask(task) {
    request.addTask(task).then(
        newTask => {
            if (task.todo) {
                displayTask(newTask);
            }
            createAddButton();               
        },
        err => console.log(err)
    );
}

function updateTask(task) {
    request.updateTask(task).then(
        resolve => {
            if (!task.todo) {
                refresh();
                return;
            }
            displayTask(task);
        },
        err => console.log(err)
    );
}

function removeTask(event) {
    var num = getNumFromClassName(event.target.parentNode.className);
    var task = {
        orderNum: num,
    };
    request.removeTask(task).then(
        resolve => refresh(),
        err => console.log(err)
    );
}

function refresh() {
    window.location = '/';
}

function removeLoader() {
    var loader = document.getElementsByClassName(classes.loader)[0];
    if (loader) {
        loader.parentNode.removeChild(loader);
    }
}

function addLoader() {
    var loader = objCreater.getLoader();
    var header = document.getElementsByClassName(classes.header)[0];
    header.firstChild = loader;
}

function createAddButton() {
    var addButton = objCreater.getAddButton();
    addButton.addEventListener('click', addButtonClick);
    var taskDiv = getDivInList(-1);
    taskDiv.innerHTML = '';
    taskDiv.appendChild(addButton);
}

function createRemoveButton(num) {
    var taskDiv = getDivInList(num);
    var delDiv = objCreater.getRemoveButton(num);
    console.log(taskDiv, delDiv);
    delDiv.addEventListener('click', removeTask);
    taskDiv.appendChild(delDiv);
}

function addButtonClick(event) {
    createTaskForm(-1);
}

function todoTouchEnd(event) {
    if (isTap(event)) {
        var targetClass = event.target.className;
        var num = getNumFromClassName(targetClass);
        createTaskForm(num);
    }
}

function todoTouchMove(event) {
    var targetClass = event.target.className;
    var num = getNumFromClassName(targetClass);
    if (isLeftSwipe(event)) {
        if(!document.getElementsByClassName(classes.remove + num).length) {
            createRemoveButton(num);
        }
    } else if (isRightSwipe(event)) {
        var removeButton = document.getElementsByClassName(classes.remove + num)[0];
        if (removeButton) {
            removeButton.parentNode.removeChild(removeButton);
        }
    }
}

function getDivInList(num) {
    return document.getElementsByClassName(classes.taskDiv + num)[0];
}

function displayTask(task) {
    var list = document.getElementsByClassName('list')[0];
    var oldTask = getDivInList(task.orderNum);
    var newTask = objCreater.getTaskDiv(task);
    var todo = newTask.firstChild;
    todo.addEventListener('touchend', todoTouchEnd);
    todo.addEventListener('touchmove', todoTouchMove);
    if (oldTask) {
        list.replaceChild(newTask, oldTask);
    } else {
        list.insertBefore(newTask, getDivInList(-1));
    }
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
    if (isDownSwipe(event)) {
        refresh();
    }
}, false) 

function isTap(event) {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY; 
    return (x === start.x && y == start.y);
}

function isLeftSwipe(event) {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    return (start.x - x > 300 && Math.abs(start.y - y) < 50);
}

function isRightSwipe(event) {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    return (x - start.x > 300 && Math.abs(start.y - y) < 50);
}

function isDownSwipe(event) {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY;
    return (Math.abs(x - start.x) < 50 && y - start.y > 300);
}
