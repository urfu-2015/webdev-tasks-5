'use strict';

function xhrRequest(method, url, async, data, callback) {
    console.log('in xhrRequest');
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
            return;
        }
        console.log('call callback');
        if (callback) {
            callback(null, xhr.responseText);
        }
    };
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log('send data: ');
        console.log(JSON.stringify(data));
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    console.log('sent');
}

function getTasks(callback) {
    console.log('in gettasks');
    xhrRequest('GET', '/tasks', true, null, function (error, data) {
        console.log('make xhrrequest in gettasks');
        if (error) {
            console.log(error);
            return;
        }
        console.log('status:');
        console.log(data);
        data = JSON.parse(data);
        console.log(data.content);
        if (callback) {
            callback(data.content);
        }
    });
}

function showAllTasks(storage) {
    console.log('in showAlltasks');
    console.log(storage);
    const container = document.getElementsByClassName('task-container')[0];
    removeChildren(container);
    storage.forEach(function (element) {
        if (element) {
            container.appendChild(createTaskItem(element));
        }
    });

}

function createTaskItem(task) {
    console.log('task in taskItem:');
    console.log(task);
    const div = document.createElement('div');
    div.className = 'task-item';
    div.id = 'task-item-' + task.id;
    const span = document.createElement('span');
    span.className = 'task-item__text';
    span.innerHTML = task.text;
    div.appendChild(span);
    const textArea = document.createElement('textarea');
    textArea.className = 'task-item__textarea task-item__textarea_hidden';
    div.appendChild(textArea);
    const button = document.createElement('button');
    button.className = 'task-item__button task-item__button_hidden';
    button.innerHTML = 'Сохранить';
    div.appendChild(button);
    const divDelete = document.createElement('div');
    divDelete.className = 'task-item__delete task-item__delete_hidden';
    div.appendChild(divDelete);
    div.addEventListener('touchstart', changeTaskEvent);
    div.addEventListener('touchstart', showDeleteButtonEvent);
    return div;
}

function removeChildren(node) {
    const children = node.childNodes;
    while (children.length) {
        node.removeChild(children[0]);
    }
}

function addTask() {
    console.log('in addTask');
    const taskTextarea = document.getElementsByClassName('task-form__textarea')[0];
    const task = { text: taskTextarea.value };
    xhrRequest('POST', '/tasks', true, task, function (error, data) {
        if (error) {
            console.log(error);
            return;
        }
        const addTaskForm = document.getElementsByClassName('task-form')[0];
        addTaskForm.className = 'task-form task-form_hidden';
        const taskDiv = createTaskItem(task);
        var container = document.getElementsByClassName('task-container')[0];
        container.appendChild(taskDiv);
        const buttonAdd = document.getElementsByClassName('task-controllers__button-add')[0];
        buttonAdd.addEventListener('touchstart', addTaskEvent);
    });
}

function showAddTaskForm() {
    let addTaskForm = document.getElementsByClassName('task-form')[0];
    addTaskForm.className = 'task-form';
    const buttonAdd = document.getElementsByClassName('task-controllers__button-add')[0];
    buttonAdd.removeEventListener('touchstart', addTaskEvent);
}

function changeTask(event) {
    console.log('in changeTaskForm');
    var task = event.currentTarget;
    if (task.className != 'task-item') {
        return;
    }
    console.log(task);
    task.className = 'task-item task-item_change';
    var textarea = document.querySelector('#' + task.id + ' .task-item__textarea');
    console.log(textarea);
    textarea.className = 'task-item__textarea';
    var text = document.querySelector('#' + task.id + ' .task-item__text');
    text.className = '.task-item__text task-item__text_hidden';
    textarea.value = text.innerHTML;
    var button = document.querySelector('#' + task.id + ' .task-item__button');
    button.className = 'task-item__button';
    task.removeEventListener('touchstart', changeTaskEvent);
    task.removeEventListener('touchstart', showDeleteButtonEvent);
    button.addEventListener('touchstart', function (event) {
        touchStartHandler(event, function () {
            xhrRequest('PATCH', '/tasks/' + task.id, true, {text: textarea.value},
            function (error, data) {
                if (error) {
                    console.log(error);
                    return;
                }
                data = JSON.parse(data);
                var newTask = createTaskItem(data);
                var container = document.getElementsByClassName('task-container')[0];
                container.replaceChild(newTask, task);
            });
        });
    });

}

function deleteTask(event) {
    console.log('in deleteTask');
    var item = event.currentTarget;
    console.log(event.currentTarget);
    if (item.className != 'task-item__delete') {
        return;
    }
    var task = item.parentNode;
    console.log('task: ');
    console.log(task);
    xhrRequest('DELETE', '/tasks/' + task.id, true, null, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        task.remove();
    });
}

function addTaskEvent(event) {
    console.log('in addTaskEvent');
    touchStartHandler(event, showAddTaskForm);
}

function saveNewTaskEvent(event) {
    console.log('in saveNewTaskEvent');
    touchStartHandler(event, addTask);
}

function changeTaskEvent(event)  {
    touchStartHandler(event, changeTask);
}

function refreshTasksEvent(event) {
    console.log('in refreshTasksEvent');
    swipeStartHandler(event, refreshTasks);
}

function showDeleteButtonEvent(event) {
    console.log('in showDeleteButtonEvent');
    swipeStartHandler(event, showDeleteButton);
}

function hideDeleteButtonEvent(event) {
    swipeStartHandler(event, hideDeleteButton);
}

function deleteTaskEvent(event) {
    touchStartHandler(event, deleteTask);
}

function showDeleteButton(swipeDirection, event) {
    console.log('in showDeleteButton');
    console.log(swipeDirection);
    console.log(event);
    const task = event.currentTarget;
    if (task.className != 'task-item') {
        return;
    }
    if (swipeDirection !== 'left') {
        return;
    }
    task.className = 'task-item task-item_show-delete';
    var deleteButton = document.querySelector('#' + task.id + ' .task-item__delete');
    deleteButton.className = 'task-item__delete';
    task.removeEventListener('touchstart', showDeleteButtonEvent);
    task.addEventListener('touchstart', hideDeleteButtonEvent);
    deleteButton.addEventListener('touchstart', deleteTaskEvent);
}

function hideDeleteButton(swipeDirection, event) {
    console.log('in hideDeleteButton');
    const task = event.currentTarget;
    if (task.className != 'task-item task-item_show-delete') {
        return;
    }
    if (swipeDirection != 'right') {
        return;
    }
    var deleteButton = document.querySelector('#' + task.id + ' .task-item__delete');
    deleteButton.className = 'task-item__delete task-item__delete_hidden';
    task.removeEventListener('touchstart', hideDeleteButtonEvent);
    task.addEventListener('touchstart', showDeleteButtonEvent);
    task.className = 'task-item';
}

function refreshTasks(swipeDirection) {
    console.log('in refreshtasks');
    if (swipeDirection !== 'down') {
        return;
    }
    var reloadDiv = document.getElementsByClassName('reload')[0];
    reloadDiv.className = 'reload';
    var oldTasksContainer = document.getElementsByClassName('task-container')[0];
    getTasks(function (storage) {
        storage.forEach(function (task) {
            if (!task) {
                return;
            }
            var taskDiv = document.getElementById('task-item-' + task.id);
            if (!taskDiv) {
                var newTask = createTaskItem(task);
                oldTasksContainer.appendChild(newTask);
            }
        });
        reloadDiv.className = 'reload reload_hidden';
    });

}

function touchStartHandler(event, callback) {
    console.log('in touchStartHandler');
    var touchObj = event.changedTouches[0];
    var startX = touchObj.pageX;
    var startY = touchObj.pageY;
    console.log(startX);
    console.log(startY);
    var startTime = new Date().getTime();
    event.currentTarget.addEventListener('touchend', touchEndHandler);

    function touchEndHandler(event) {
        console.log('in touchEndHandler');
        var endTime = new Date().getTime();
        var touchObj = event.changedTouches[0];
        console.log('time: ');
        console.log(endTime - startTime);
        var totalTime = endTime - startTime;
        console.log(startX - touchObj.pageX);
        console.log(startY - touchObj.pageY);
        if (totalTime < 250 &&
        Math.abs(startX - touchObj.pageX) < 10 && Math.abs(startY - touchObj.pageY) < 10) {
            console.log('it was touch');
            console.log(callback);
            if (callback) {
                callback(event);
            }
        }
        event.currentTarget.removeEventListener('touchend', touchEndHandler);
    }
}

function swipeStartHandler(event, callback) {
    console.log('in swipeStartHandler');
    var touchObj = event.changedTouches[0];
    var startX = touchObj.pageX;
    var startY = touchObj.pageY;
    console.log(startX);
    console.log(startY);
    var startTime = new Date().getTime();
    event.currentTarget.addEventListener('touchend', swipeEndHandler);

    function swipeEndHandler(event) {
        console.log('in swipeEndHandler');
        var swipeDirection = '';
        var touchObj = event.changedTouches[0];
        var distX = touchObj.pageX - startX;
        var distY = touchObj.pageY - startY;
        var totalTime = new Date().getTime() - startTime;
        var allowedTime = 1000;
        if (totalTime < allowedTime) {
            if (Math.abs(distX) >= 150 && Math.abs(distY) <= 100) {
                swipeDirection = distX < 0 ? 'left' : 'right';
            } else if (Math.abs(distY) >= 150 && Math.abs(distX) <= 100) {
                swipeDirection = distY < 0 ? 'up' : 'down';
            }
        }
        console.log('swipe direction: ' + swipeDirection);
        if (callback && swipeDirection) {
            callback(swipeDirection, event);
        }
    }

}

document.addEventListener('DOMContentLoaded', init);

function init() {
    getTasks(showAllTasks);
    document.addEventListener('touchstart', touchStartHandler);
    const buttonAdd = document.getElementsByClassName('task-controllers__button-add')[0];
    console.log('buttonAdd');
    console.log(buttonAdd);
    buttonAdd.addEventListener('touchstart', addTaskEvent);
    const buttonSave = document.getElementsByClassName('task-form__button-save')[0];
    buttonSave.addEventListener('touchstart', saveNewTaskEvent);
    document.body.addEventListener('touchstart', refreshTasksEvent);
}

