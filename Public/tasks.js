'use strict';

function xhrRequest(method, url, async, data, callback) {
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
        if (callback) {
            callback(xhr.responseText);
        }
    };
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

function getTasks() {
    xhrRequest('GET', '/tasks', true, {}, function (error, data) {
        if (error) {
            console.log(error);
            return;
        }
        if (data.status === 200) {
            showAllTasks(data.content);
        }
    });
}

function showAllTasks(storage) {
    // Есть контейнер, надо из него удалить все которые были и добавить новые
    const container = document.getElementsByClassName('task-container');
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
    div.appendChild(textArea);
    const button = document.createElement('button');
    button.className = 'task-item__button-send';
    div.appendChild(button);
    const divDelete = document.createElement('div');
    divDelete.className = 'task-item__delete task-item__delete_hidden';
    div.appendChild(divDelete);
    return div;
}

function removeChildren(node) {
    var children = node.childNodes;
    while (children.length) {
        node.removeChild(children[0]);
    }
}

getTasks();
