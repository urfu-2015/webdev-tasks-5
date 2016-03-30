'use strict';

var handlers = [];

function changeTask (id) {
    
};

function getTasks() {
    XHR.getJSON('/api/task', function (code, tasks) {
        tasks.forEach(function (task) {
            var th = new TaskHandler(task.id, task.text);
            document.getElementsByClassName('task-list__append-zone')[0].appendChild(th.getNode());            
            handlers.push(th);
        });
    });
};

window.addEventListener('load', getTasks);