'use strict';

var handlers = [];

function changeTask(th) {
    XHR.putJSON('/api/task/' + th.getId(), { text: th.getEditedText() }, function (code, res) {
        if (code == 200) {
            th.setText(th.getEditedText());
        }
    });
}

function deleteTask(th) {
    XHR.deleteJSON('/api/task/' + th.getId(), function (code, res) {
        for (var i = 0;
            i < handlers.length && handlers[i] != th;
            i++) {}
        handlers.splice(i, 1);
        document.getElementsByClassName('task-list__append-zone')[0].removeChild(th.getNode());
    });
}

function addTask() {
    var text = document.getElementsByClassName('add-item-area')[0].value;
    XHR.postJSON('/api/task', { text: text}, function (code, res) {
       createTaskOnFront(res.task);
    });
}

function createTaskOnFront(task) {
    var th = new TaskHandler(task.id, task.text);
    document.getElementsByClassName('task-list__append-zone')[0].appendChild(th.getNode());    
    th.changeTaskCB = changeTask;
    th.deleteTaskCB = deleteTask;
    handlers.push(th);
}

function showLoading() {
    document.getElementsByClassName('loading-image')[0].style.display = 'inline';
}

function hideLoading() {
    document.getElementsByClassName('loading-image')[0].style.display = 'none';
}

function getNewTasks() {
    showLoading();
    XHR.getJSON('/api/task', function (code, tasks) {
        hideLoading();
        tasks.filter(function (task) {
            return !handlers.some(function (handler) {
                return handler.getId() == task.id;
            });
        }).forEach(createTaskOnFront);
    });
}

function getTasks() {
    hideLoading();
    XHR.getJSON('/api/task', function (code, tasks) {
        tasks.forEach(createTaskOnFront);
    });
}

window.addEventListener('load', function () {
    document.getElementsByClassName('task-item__add-button')[0]
    .addEventListener('click', addTask);
    var updateHandler = 
        new TapHandler(document.getElementsByClassName('task-list')[0]);
   updateHandler.swipeDownCB = getNewTasks;
});
window.addEventListener('load', getTasks);