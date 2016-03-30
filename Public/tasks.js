'use strict';

function xhrRequest(method, url, async, data, callback) {
    console.log('in xhrRequest');
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.onreadystatechange = function () {
        console.log('readyState: ' + xhr.readyState);
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
    const task = {text: 'Task'};
    xhrRequest('POST', '/tasks', true, task, function (error, data) {
        if (error) {
            console.log(error);
            return;
        }
        if(data.status === 200) {
            const taskDiv = createTaskItem(task);
            var container = document.getElementsByClassName('task-container')[0];
            container.appendChild(taskDiv);
        }
    });
}


function addTaskEvent (event) {
    tap(event, addTask);
}

function tap (event) {

}


//--------------------------------------------------------
getTasks();
const buttonAdd = document.getElementsByClassName('task-controllers__button-add')[0];
console.log('buttonAdd');
console.log(buttonAdd);
//buttonAdd.addEventListener('touchstart', addTaskEvent);
