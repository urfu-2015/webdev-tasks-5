require('./main.css');
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
        }
    };
}

function createTaskForm(num) {
	var taskDiv = getDivInList(num);
    var input = getNewInput('list__task__input__num_', num);
    taskDiv.innerHTML = '';
	taskDiv.appendChild(input);
	taskDiv.appendChild(getSaveButton());
    focusOnInput(num);
}

function focusOnInput(num) {
    document.getElementsByClassName('list__task__input__num_' + num)[0].focus();
}

function getNewInput(className, num) {
	var input = document.createElement('input');
	input.setAttribute("type", "text");
	input.setAttribute("name", "todo")
	input.className = className + num;
    if (num !== -1) {
        var oldText = document.getElementsByClassName('list__task__todo__num_' + num)[0].innerHTML;
        input.value = oldText;
    }
    input.addEventListener('touchend', function(event) {
        if (isTap) {
            event.target.focus();
        }
    })
	return input;
}

function getSaveButton() {
	var saveButton = document.createElement('button');
	saveButton.className = 'list__task__submit';
    saveButton.innerHTML = 'Save';
	return saveButton;
}

function saveTask(num) {
    console.log(num);
    var input = document.getElementsByClassName('list__task__input__num_' + num)[0];
    if (num === '-1') {
        addTask(input);
    }
    else {
        updateTask(input);
    }
}

function createAddButton() {
    var addButton = document.createElement('button');
    addButton.className = 'list__task__add';
    addButton.innerHTML = 'Add task';
    var taskDiv = getDivInList(-1);
    taskDiv.innerHTML = '';
    taskDiv.appendChild(addButton);
}

function createDeleteButton(num) {
    var taskDiv = getDivInList(num);
    var delDiv = document.createElement('div');
    delDiv.className = "delete__num_" + num;
    taskDiv.appendChild(delDiv);
    delDiv.addEventListener('touchend', deleteButtonToucheEnd);
}

function deleteButtonToucheEnd(event) {
    if (isTap(event)) {
        var parent = event.target.parentNode;
        console.log(parent);
        deleteTask(parent);
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
        console.log(list.lastChild)
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
        console.log(task);
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
var start={};

document.addEventListener('touchstart', function(event) {
    if (event.targetTouches.length > 1) {
        return;
    }
    event.preventDefault();
    ldelay = new Date(); 
    start.x = event.changedTouches[0].pageX;
    start.y = event.changedTouches[0].pageY;
}, false);

document.addEventListener('touchmove', function(event) {
    if (event.targetTouches.length > 1) {
        return;
    }
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    var target = event.touches[0].target;
    if (start.x - x > 300 && Math.abs(start.y - y) < 50) {
        if (new RegExp('list__task__todo').test(target.className)) {
            var num = getNumFromClassName(target.className);
            console.log(num);
            if(!document.getElementsByClassName('delete__num_' + num).length) {
                createDeleteButton(num);
            }
        }
    }
}, false)


function isTap(event) {
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY; 
    return (x === start.x && y == start.y);
}
document.addEventListener('touchend', function (event) {
    if (event.changedTouches.length > 1) {
        return;
    }
    var pdelay = new Date();
    console.log(event.changedTouches[0].target.className);
    var target = event.changedTouches[0].target
    var targetClass = target.className;
    if (isTap(event)) {
        if (pdelay.getTime() - ldelay.getTime() > 800) {
        console.log('dolgooo');
        /*Перенос действия*/
        } else if (targetClass === 'list__task__add') {
            createTaskForm(-1);
        } else if (targetClass === 'list__task__submit') {
            var num = getNumFromClassName(target.parentNode.className);
            saveTask(num);
        } else if (new RegExp('list__task__todo').test(targetClass)) {
            var num = getNumFromClassName(targetClass);
            createTaskForm(num);
        }

    }

}, false);
