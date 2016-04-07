'use strict';

var saveButtons = document.getElementsByClassName('list__saving');
saveButtons = Array.prototype.slice.call(saveButtons);
for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener('touchstart', function(event) {
        var fix = this.parentElement;
        var task = fix.parentElement;
        var form = task.children[0];
        form.classList.add('list__form_visible');
        fix.classList.remove('list__fix_visible');
        var index = 0;
        var list = task.parentElement;
        for (var i = 0; i < list.children.length; i++) {
            if (list.children[i] === task) {
                index = i;
                break;
            }
        }
        var body = index + ',' + fix.children[0].value;
        var options = {
            method: 'post',
            body: body
        };
        sendRequest('/updates', options);
    }, false);
}

var tasks = document.getElementsByClassName('list__task');
tasks = Array.prototype.slice.call(tasks);
for (var i = 0; i < tasks.length; i++) {
    var start;
    var end;
    tasks[i].addEventListener('touchstart', function(event) {
        event.stopPropagation();
        start = event.changedTouches[0];
    }, false);
    tasks[i].addEventListener('touchend', function(event) {
        event.stopPropagation();
        end = event.changedTouches[0];
        var trash = this.parentElement.children[1];
        var distanceX = Math.abs(end.pageX - start.pageX);
        if (distanceX > 20) {
            if (end.pageX < start.pageX) {
                this.classList.add('list__task_shift');
                trash.classList.add('list__trash_visible');
            }
            if (end.pageX > start.pageX) {
                this.classList.remove('list__task_shift');
                trash.classList.remove('list__trash_visible');
            }
        } else {
            var form = this.parentElement;
            var fix = form.parentElement.children[1];
            form.classList.remove('list__form_visible');
            fix.classList.add('list__fix_visible');
        }
    }, false);
}

var globalStart;
var globalEnd;
document.addEventListener('touchstart', function(event) {
    event.stopPropagation();
    globalStart = event.changedTouches[0];
}, false);
document.addEventListener('touchend', function(event) {
    globalEnd = event.changedTouches[0];
    var refresh = document.getElementsByClassName('refresh')[0];
    if (globalEnd.pageY - globalStart.pageY > 20) {
        document.body.classList.add('body_shift_down');
        refresh.classList.add('refresh_visible');
        var list = getListTasks();
        var cb = function() {
            refresh.classList.remove('refresh_visible');
            document.body.classList.remove('body_shift_down');
        };
        var options = {
            method: 'post',
            body: list.join()
        };
        sendRequest('/', options, cb);
    }
}, false);

var trashs = document.getElementsByClassName('list__trash');
trashs = Array.prototype.slice.call(trashs);
for (var i = 0; i < trashs.length; i++) {
    trashs[i].addEventListener('touchstart', function(event) {
        event.preventDefault();
        var task = this.parentElement.parentElement;
        var list = task.parentElement;
        var index = 0;
        for (var i = 0; i < list.children.length; i++) {
            if (list.children[i] === task) {
                index = i;
                break;
            }
        }
        task.style.display = 'none';
        var options = {
            method: 'post',
            body: index.toString()
        };
        sendRequest('/deletions', options);
    }, false);
}

function sendRequest(url, options, cb) {
    options['headers'] = {'Content-type': 'application/x-www-form-urlencoded'};
    fetch(url, options)
        .then(function(response) {
            return response.text();
        })
        .then(function(body) {
            document.body.innerHTML = body;
        })
        .then(cb)
        .catch(console.error);
}

function getListTasks() {
    var texts = [];
    var list = document.getElementsByClassName('list')[0];
    for (var i = 0; i < list.children.length; i++) {
        var task = list.children[i];
        var text = task.children[1].children[0].value;
        texts.push(text);
    }
    return texts;
}
