'use strict';

function xhrRequest(method, url, async, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status != 200) {
            return;
        }
        if (callback) {
            callback(null, xhr.responseText);
        }
    };
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

function getTasks(callback) {
    xhrRequest('GET', '/tasks', true, null, function (error, data) {
        if (error) {
            console.log(error);
            return;
        }
        data = JSON.parse(data);
        if (callback) {
            callback(data.content);
        }
    });
}

function showAllTasks(storage) {
    const container = document.getElementsByClassName('task-container')[0];
    removeChildren(container);
    storage.forEach(function (element) {
        if (element) {
            container.appendChild(createTaskItem(element));
        }
    });

}

function createTaskItem(task) {
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
    var task = event.currentTarget;
    if (task.className != 'task-item') {
        return;
    }
    task.className = 'task-item task-item_change';
    var textarea = document.querySelector('#' + task.id + ' .task-item__textarea');
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
    var item = event.currentTarget;
    if (item.className != 'task-item__delete') {
        return;
    }
    var task = item.parentNode;
    xhrRequest('DELETE', '/tasks/' + task.id, true, null, function (error) {
        if (error) {
            console.log(error);
            return;
        }
        task.remove();
    });
}

function addTaskEvent(event) {
    touchStartHandler(event, showAddTaskForm);
}

function saveNewTaskEvent(event) {
    touchStartHandler(event, addTask);
}

function changeTaskEvent(event)  {
    touchStartHandler(event, changeTask);
}

function refreshTasksEvent(event) {
    swipeStartHandler(event, refreshTasks);
}

function showDeleteButtonEvent(event) {
    swipeStartHandler(event, showDeleteButton);
}

function hideDeleteButtonEvent(event) {
    swipeStartHandler(event, hideDeleteButton);
}

function deleteTaskEvent(event) {
    touchStartHandler(event, deleteTask);
}

function showDeleteButton(swipeDirection, event) {
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
    var touchObj = event.changedTouches[0];
    var startX = touchObj.pageX;
    var startY = touchObj.pageY;
    var startTime = new Date().getTime();
    event.currentTarget.addEventListener('touchend', touchEndHandler);

    function touchEndHandler(event) {
        var endTime = new Date().getTime();
        var touchObj = event.changedTouches[0];
        var totalTime = endTime - startTime;
        if (totalTime < 250 &&
        Math.abs(startX - touchObj.pageX) < 10 && Math.abs(startY - touchObj.pageY) < 10) {
            if (callback) {
                callback(event);
            }
        }
        event.currentTarget.removeEventListener('touchend', touchEndHandler);
    }
}

function swipeStartHandler(event, callback) {
    var touchObj = event.changedTouches[0];
    var startX = touchObj.pageX;
    var startY = touchObj.pageY;
    var startTime = new Date().getTime();
    event.currentTarget.addEventListener('touchend', swipeEndHandler);

    function swipeEndHandler(event) {
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
    buttonAdd.addEventListener('touchstart', addTaskEvent);
    const buttonSave = document.getElementsByClassName('task-form__button-save')[0];
    buttonSave.addEventListener('touchstart', saveNewTaskEvent);
    document.body.addEventListener('touchstart', refreshTasksEvent);
}

