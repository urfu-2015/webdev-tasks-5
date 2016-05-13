window.onload = function () {
    update();
    initialize();
};

var tasksID = {};

function initialize() {
    var button = document.querySelector('.task-creator .add-button');
    button.addEventListener('touchstart', () => {
        var text = document.querySelector('.task-creator .task-form').value;
        createTask(text, (err, res) => {
            var task = makeTask(text, res);
            var taskList = document.querySelector('.tasks');
            taskList.appendChild(task);
        });
    });

    var tasks = document.getElementsByTagName('main')[0];
    tasks.style.top = '0px';

    var startPoint = {};
    var delta = 0;

    document.body.addEventListener('touchstart', event =>  {
        startPoint = event.changedTouches[0];
    });

    document.body.addEventListener('touchmove', event => {
        var currentPoint = event.changedTouches[0];
        delta = currentPoint.pageY - startPoint.pageY;
        delta = Math.max(0, Math.min(delta, 40));
        if (delta > 10) {
            tasks.style.top = delta + 'px';
        }
    });

    document.body.addEventListener('touchend', () => {
        if (delta >= 40) {
            update();
            setTimeout(() => {
                tasks.style.top = '0px';
            }, 500);
        } else {
            tasks.style.top = '0px';
        }
        delta = 0;
    });
}

function update() {
    var todolist = document.getElementsByClassName('wrapper');
    while(todolist.length) {
        todolist[0].parentNode.removeChild(todolist[0]);
    }
    getTaskList(function (err, data) {
        if (err) {
            alert(err);
            return;
        }
        var taskList = document.querySelector('.tasks');
        Object.keys(data).forEach((index) => {
            var newTask = makeTask(data[index], index);
            taskList.appendChild(newTask);
        });
    });
}

function makeTask(text, id) {
    var taskText = document.createElement('div');
    taskText.className = 'todo';
    taskText.innerHTML = text;

    var swiped = false;
    var startPoint;
    taskText.addEventListener('touchstart', event => {
        startPoint = event.changedTouches[0];
        setTimeout(() => {
            if (!swiped) {
                replaceBlockToForm(taskText, id);
            }
        }, 200);
    });

    taskText.addEventListener('touchmove', event => {
        swiped = true;
        var secondPoint = event.changedTouches[0];
        if (secondPoint.pageX - startPoint.pageX >= -20) {
            taskText.className = 'todo slided';//TODO change name
        } if (secondPoint.pageX - startPoint.pageX >= 20) {
            taskText.className = 'todo';
            setTimeout(() => swiped = false, 100);
        }
    });

    var taskButton = document.createElement('div');
    taskButton.className = 'delete-button';

    taskButton.addEventListener('touchstart', event => {
        deleteTask(id, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                taskText.parentNode.remove();
            }
        });
    });

    var newWrapper = document.createElement('div');
    newWrapper.className = 'wrapper';

    newWrapper.appendChild(taskText);
    newWrapper.appendChild(taskButton);

    tasksID[id] = newWrapper;
    return newWrapper;
}

function replaceFormToBlock(textForm, replaceWrapper, id) {
    var task = tasksID[id];
    task.querySelector('.todo').innerHTML = textForm.value;
    replaceWrapper.parentNode.replaceChild(task, replaceWrapper);
}

function replaceBlockToForm(taskText, id) {
    var textForm = document.createElement('input');
    textForm.className = 'taskTextArea'; //TODO norm nazvanie
    textForm.value = taskText.innerHTML;

    var saveButton = document.createElement('button');
    saveButton.className = 'saveButton';
    saveButton.addEventListener('touchstart', event => {
        updateTask(textForm.value, id, (err) => {
            if (err) {
                console.log(err);
            } else {
                replaceFormToBlock(textForm, replaceWrapper, id);
            }
        });
    });

    var replaceWrapper = document.createElement('div');
    replaceWrapper.className = 'replace wrapper';
    replaceWrapper.appendChild(textForm);
    replaceWrapper.appendChild(saveButton);

    var parent = taskText.parentNode;
    parent.parentNode.replaceChild(replaceWrapper, parent);
}

function updateTask(text, id, callback) {
    var req = new XMLHttpRequest();
    req.open('PATCH', '/tasks/' + id, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send(JSON.stringify({ text }));
    req.onreadystatechange = function() {
        if (req.readyState != 4) {
            return;
        }
        if (req.status != 200) {
            callback(req.status + ': ' + req.statusText, null);
        } else {
            callback(null, req.responseText);
        }
    };
}

function deleteTask(id, callback) {
    var req = new XMLHttpRequest();
    req.open('DELETE', '/tasks/' + id, true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send();
    req.onreadystatechange = function() {
        if (req.readyState != 4) {
            return;
        }
        if (req.status != 200) {
            callback(req.status + ': ' + req.statusText, null);
        } else {
            callback(null, req.responseText);
        }
    };
}

function createTask(text, callback) {
    var req = new XMLHttpRequest();
    req.open('POST', '/tasks', true);
    req.setRequestHeader('Content-type', 'application/json');

    req.send(JSON.stringify({ text }));
    req.onreadystatechange = function() {
        if (req.readyState != 4) {
            return;
        }
        if (req.status != 201) {
            callback(req.status + ': ' + req.statusText, null);
        } else {
            callback(null, req.responseText);
        }
    };
}

function getTaskList(callback) {
    var req = new XMLHttpRequest();
    req.open('GET', '/task-list', true);
    req.setRequestHeader('Content-type', 'application/json');
    req.send();
    req.onreadystatechange = function() {
        if (req.readyState != 4) {
            return;
        }
        if (req.status != 200) {
            callback(req.status + ': ' + req.statusText, null);
        } else {
            callback(null, JSON.parse(req.response));
        }
    };
}