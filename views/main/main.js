require('./main.css');

var inputClassName = 'list__task__input__num_';

function request(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Access', 'application/json;');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            callback({status: xhr.status, content: xhr.statusText});
        } else {
            callback(null, JSON.parse(xhr.responseText));
            addEventListeners();
        }
    };
}

addEventListeners();

function addEventListeners() {
    var addButton = document.getElementsByClassName('list__task__add')[0];
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
    var input = getNewInput(num);
    var saveButton = getSaveButton();
    saveButton.addEventListener('click', saveButtonClick);
    taskDiv.innerHTML = '';
    taskDiv.appendChild(input);
	taskDiv.appendChild(saveButton);
    focusOnInput(num);
}

function focusOnInput(num) {
    document.getElementsByClassName(inputClassName + num)[0].focus();
}

function getNewInput(num) {
	var input = document.createElement('input');
	input.setAttribute("type", "text");
	input.setAttribute("name", "todo")
	input.className = inputClassName + num;
    if (num !== -1) {
        var oldText = document
            .getElementsByClassName('list__task__todo__num_' + num)[0]
            .innerHTML;
        input.value = oldText;
    }
	return input;
}

function getSaveButton() {
	var saveButton = document.createElement('button');
	saveButton.className = 'list__task__submit';
    saveButton.innerHTML = 'Save';
	return saveButton;
}

function saveTask(num) {
    var input = document.getElementsByClassName(inputClassName + num)[0];
    if (num === '-1') {
        addTask(input);
    } else {
        updateTask(input);
    }
}

function createAddButton() {
    var addButton = getAddButton();
    addButton.addEventListener('click', addButtonClick);
    var taskDiv = getDivInList(-1);
    taskDiv.innerHTML = '';
    taskDiv.appendChild(addButton);
}

function getAddButton() {
    var addButton = document.createElement('button');
    addButton.className = 'list__task__add';
    addButton.innerHTML = 'Add task';
    return addButton;
}

function createDeleteButton(num) {
    var taskDiv = getDivInList(num);
    var delDiv = getDeleteButton(num);
    delDiv.addEventListener('click', deleteButtonClick);
    taskDiv.appendChild(delDiv);
}

function getDeleteButton(num) {
    var delDiv = document.createElement('div');
    delDiv.className = "delete__num_" + num;
    return delDiv;
}

function deleteButtonClick(event) {
    var parent = event.target.parentNode;
    deleteTask(parent);
}

function saveButtonClick(event) {
    var num = getNumFromClassName(event.target.parentNode.className);
    saveTask(num);
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
        if(!document.getElementsByClassName('delete__num_' + num).length) {
            createDeleteButton(num);
        }
    } else if (isRightSwipe(event)) {
        var deleteButton = document.getElementsByClassName('delete__num_' + num)[0];
        if (deleteButton) {
            deleteButton.parentNode.removeChild(deleteButton);
        }
    }
}

function getDivInList(num) {
    return document.getElementsByClassName('list__task__num_' + num)[0];
}

function displayTask(task) {
    var list = document.getElementsByClassName('list')[0];
    var oldTask = getDivInList(task.orderNum);
    var newTask = getTaskDiv(task);
    if (oldTask) {
        list.replaceChild(newTask, oldTask);
    } else {
        list.insertBefore(newTask, getDivInList(-1));
    }
}

function getTaskDiv(task) {
    var taskDiv = document.createElement('div');
    taskDiv.className = 'list__task__num_' + task.orderNum;
    var taskTodo = document.createElement('div');
    taskTodo.className = 'list__task__todo__num_' + task.orderNum;
    taskTodo.innerHTML = task.todo;
    taskDiv.appendChild(taskTodo);
    return taskDiv;
}

function getNumFromClassName(className) {
    return className.split('num_').pop();
}

function addTask(input) {
    var task = {
        todo: input.value
    };
    request('POST', '/addTask', task, function (err, task) {
        if (err) {
            console.error(err);
            return;
        }
        if (task.todo) {
            displayTask(task);
        }
        createAddButton();
    })
}

function updateTask(input) {
    var num = getNumFromClassName(input.className);
    var task = {
        orderNum: num,
        todo: input.value
    };
    request('POST', '/updateTask', task, function (err, task) {
        if (err) {
            console.error(err);
            return;
        }
        if (!task.todo) {
            window.location.href = '/';
            return;
        }
        displayTask(task);
    })
}

function deleteTask(div) {
    var num = getNumFromClassName(div.className);
    var task = {
        orderNum: num,
    };
    request('POST', '/deleteTask', task, function (err, task) {
        if (err) {
            console.error(err);
            return;
        }
        window.location.href = '/';
    })
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