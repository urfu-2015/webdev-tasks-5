'use strict';

var start;
var end;
var tasks = document.querySelector('.tasks');

tasks.addEventListener('touchstart', function(event) {
    var targetClassList = Array.prototype.slice.call(event.target.classList);
    event.stopPropagation();
    start = event.changedTouches[0];
    if (targetClassList.indexOf('task__save') !== -1) {
        saveText(event.target);
    }
    if (targetClassList.indexOf('task__trash') !== -1) {
        deleteTask(event.target);
    }
}, false);

tasks.addEventListener('touchend', function(event) {
    event.stopPropagation();
    end = event.changedTouches[0];
    var targetClassList = Array.prototype.slice.call(event.target.classList);
    if (targetClassList.indexOf('task__name') !== -1) {
        shiftOrChangeForm(event.target);
    }
}, false);

var globalStart;
var globalEnd;

document.addEventListener('touchstart', function(event) {
    event.stopPropagation();
    globalStart = event.changedTouches[0];
}, false);

document.addEventListener('touchend', function(event) {
    globalEnd = event.changedTouches[0];
    var targetClassList = Array.prototype.slice.call(event.target.classList);
    if (targetClassList.indexOf('form__button') !== -1) {
        addTask(event.target);
    } else {
        if (globalEnd.pageY - globalStart.pageY > 20) {
            var refresh = document.getElementsByClassName('refresh')[0];
            document.body.classList.add('body_shift_down');
            refresh.classList.remove('refresh_invisible');
            var cb = function() {
                refresh.classList.add('refresh_invisible');
                document.body.classList.remove('body_shift_down');
            };
            var options = {
                method: 'get'
            };
            sendRequest('/', options, cb);
        }
    }
}, false);

function saveText(target) {
    var updateForm = target.parentElement;
    var task = updateForm.parentElement;
    var deleteForm = task.querySelector('.task__action_delete');
    deleteForm.classList.remove('task__action_invisible');
    updateForm.classList.add('task__action_invisible');
    var taskId = task.dataset.id;
    var options = {
        method: 'put',
        body: updateForm.querySelector('.task__text').value
    };
    sendAction('/api/tasks/' + taskId, options);
}

function shiftOrChangeForm(target) {
    var trash = target.parentElement.children[1];
    var distanceX = Math.abs(end.pageX - start.pageX);
    if (distanceX > 20) {
        if (end.pageX < start.pageX) {
            target.classList.add('task__name_shift');
            trash.classList.remove('task__trash_invisible');
        }
        if (end.pageX > start.pageX) {
            target.classList.remove('task__name_shift');
            trash.classList.add('task__trash_invisible');
        }
    } else {
        var deleteForm = target.parentElement;
        var updateForm = deleteForm.parentElement.querySelector(".task__action_update");
        deleteForm.classList.add('task__action_invisible');
        updateForm.classList.remove('task__action_invisible');
    }
}

function deleteTask(target) {
    var task = target.parentElement.parentElement;
    var tasks = task.parentElement;
    task.style.display = 'none';
    var taskId = task.dataset.id;
    var options = {
        method: 'delete',
    };
    sendAction('/api/tasks/' + taskId, options);
}

function addTask(target) {
    var form = target.parentElement;
    var options = {
        method: 'post',
        body: form.querySelector('.form__text').value
    };
    sendRequest('/api/tasks', options);
}

function sendRequest(url, options, cb) {
    options['headers'] = {'Content-type': 'application/x-www-form-urlencoded'};
    fetch(url, options)
        .then(function(response) {
            return response.text();
        })
        .then(function(body) {
            document.body.innerHTML = body;
            if (cb) {
                cb();
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function sendAction(url, options) {
    options['headers'] = {'Content-type': 'application/x-www-form-urlencoded'};
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            if (json.code !== 200 && json.code !== 201) {
                console.log('code: ' + json.code + ', ' + json.message);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
