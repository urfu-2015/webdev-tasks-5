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
};

function getTasks() {
    XHR.getJSON('/api/task', function (code, tasks) {
        tasks.forEach(function (task) {
            var th = new TaskHandler(task.id, task.text);
            document.getElementsByClassName('task-list__append-zone')[0].appendChild(th.getNode());    
            th.changeTaskCB = changeTask;
            th.deleteTaskCB = deleteTask;
            handlers.push(th);
        });
    });
}

window.addEventListener('load', getTasks);