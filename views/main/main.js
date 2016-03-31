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

function getTaskForm(num) {
	var form = document.createElement('form');
	form.setAttribute("action","/addTask");
	form.setAttribute("method","POST");
    var input = getNewInput('task-creater__input task-num_', num);
	form.appendChild(input);
	form.className = 'task-creater'
	form.appendChild(getNewSubmit());
    return form;
}

function focusOnInput(num) {
    document.getElementsByClassName('task-num_' + num)[0].focus();
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
	return input;
}

function getNewSubmit() {
	var submit = document.createElement('input');
	submit.setAttribute("type", "submit");
	submit.setAttribute("value", "save");
	submit.className = 'task-creater__submit';
	return submit;
}

function saveTask() {
    var input = document.getElementsByClassName('task-creater__input')[0];
    if (input.className === 'task-creater__input task-num_-1') {
        addTask(input);
    }
    else {
        updateTask(input);
    }
}

function createAddButton() {
    var addButton = document.createElement('button');
    addButton.className = 'task-creater__add';
    addButton.innerHTML = 'Add task';
    createNewTaskDiv(addButton);
}

function createDeleteButton(num) {
    var div = document.getElementsByClassName('list__task__num_' + num)[0];
    var delDiv = document.createElement('div');
    delDiv.className = "delete__num_" + num;
    div.appendChild(delDiv);
}

function createNewTaskDiv(child) {
    var div = document.getElementsByClassName('form-place')[0];
    div.innerHTML = '';
    div.appendChild(child);
}

function createTaskDiv(num, child) {
    var div = document.getElementsByClassName('list__task__num_' + num)[0];
    div.innerHTML = '';
    div.appendChild(child);
}

function displayNewTask(task) {
    var list = document.getElementsByClassName('list')[0];
    var newTask = getTaskDiv(task);
    list.appendChild(newTask);
}

function displayUpdatedTask(task) {
    createTaskDiv(task.orderNum, getTaskDiv(task));
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
            displayNewTask(task);
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
        displayUpdatedTask(task);
    })
}

function deleteTask(input) {
    var num = getNumFromClassName(input.className);
    var task = {
        orderNum: num,
        todo: input.value
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

document.addEventListener('touchend', function (event) {
    if (event.changedTouches.length > 1) {
        return;
    }
    var pdelay = new Date();
    console.log(event.changedTouches[0].target.className);
    var target = event.changedTouches[0].target;
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY; 
    if (x === start.x && y == start.y) {
        if (pdelay.getTime() - ldelay.getTime() > 800) {
        console.log('dolgooo');
        /*Перенос действия*/
        } else if (target.className === 'task-creater__add') {
            createNewTaskDiv(getTaskForm(-1));
            focusOnInput(-1);
        } else if (target.className === 'task-creater__submit') {
            saveTask();
        } else if (new RegExp('list__task__todo').test(target.className)) {
            var num = getNumFromClassName(target.className);
            createTaskDiv(num, getTaskForm(num));
            focusOnInput(num);
        }

    }

}, false);
