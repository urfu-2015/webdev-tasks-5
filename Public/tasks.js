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

function getTasks() {
    console.log('in gettasks');
    xhrRequest('GET', '/tasks', true, {}, function (error, data) {
        console.log('make xhrrequest in gettasks');
        if (error) {
            console.log(error);
            return;
        }
        console.log('status:');
        console.log(data);
        data = JSON.parse(data);
        console.log(data.content);
        showAllTasks(data.content);
    });
}

function showAllTasks(storage) {
    // Есть контейнер, надо из него удалить все которые были и добавить новые
    console.log('in showAlltasks');
    console.log(storage);
    const container = document.getElementsByClassName('task-container')[0];
    removeChildren(container);
    storage.forEach(function (element) {
        container.appendChild(createTaskItem(element));
    });

}

function createTaskItem(task) {
    const div = document.createElement('div');
    div.className = 'task-item';
    const span = document.createElement('span');
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
    return div;
}

function removeChildren(node) {
    const children = node.childNodes;
    while (children.length) {
        node.removeChild(children[0]);
    }
}

function addTask () {
    console.log('in addTask');
    const task = {text: 'Task'};
    xhrRequest('POST', '/tasks', true, task, function (error, data) {
        if (error) {
            console.log(error);
            return;
        }
        const taskDiv = createTaskItem(task);
        var container = document.getElementsByClassName('task-container')[0];
        container.appendChild(taskDiv);
    });
}

function deleteTask (event) {
    var item = event.currentTarget;
    console.log(event.currentTarget);

    // знаем на какой нажали, надо найти его id
    xhrRequest('DELETE', '/tasks', {id: id}, function (error, data) {
        if (error) {
            console.log(error);
            return;
        }

    })
}

function changeTask () {

}

function addTaskEvent (event) {
    console.log('in addTaskEvent');
    touchStartHandler(event, addTask);
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
            if(callback) {
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
        var swipeDirection = '';
        var touchObj = event.changedTouches[0];
        var distX = touchObj.pageX - startX;
        var distY = touchObj.pageY - startY;
        var totalTime = new Date().getTime() - startTime;
        var allowedTime = 300;
        if (totalTime < allowedTime) {
            if(Math.abs(distX) >= 150 && Math.abs(distY) <= 100) {
                swipeDirection = distX < 0? 'left' : 'right';
            } else if (Math.abs(distY) >= 150 && Math.abs(distX) <= 100) {
                swipeDirection = distY < 0? 'down' : 'up';
            }
        }
        if (callback && swipeDirection) {
            callback(swipeDirection);
        }
    }

}

document.addEventListener('DOMContentLoaded', init);

function init() {
    getTasks();
    document.addEventListener('touchstart', touchStartHandler);
    const buttonAdd = document.getElementsByClassName('task-controllers__button-add')[0];
    console.log('buttonAdd');
    console.log(buttonAdd);
    buttonAdd.addEventListener('touchstart', addTaskEvent);
}

