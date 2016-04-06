'use strict';

var saveButtons = document.getElementsByClassName('list__saving');
saveButtons = Array.prototype.slice.call(saveButtons);
for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener('touchstart', function(event) {
        var fix = this.parentElement;
        var task = fix.parentElement;
        var form = task.children[0];
        form.style.display = 'block';
        fix.style.display = 'none';
        var index = 0;
        var list = task.parentElement;
        for (var i = 0; i < list.children.length; i++) {
            if (list.children[i] === task) {
                index = i;
                break;
            }
        }
        var body = index + ',' + fix.children[0].value;
        sendRequest(body, '/updates');
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
                this.style.transform = 'translateX(-50px)';
                trash.style.display = 'inline-block';
            }
            if (end.pageX > start.pageX) {
                this.style.transform = 'translateX(0px)';
                trash.style.display = 'none';
            }
        } else {
            var form = this.parentElement;
            var fix = form.parentElement.children[1];
            form.style.display = 'none';
            fix.style.display = 'block';
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
        document.body.style.transform = 'translateY(30px)';
        refresh.style.display = 'inline-block';
        var list = getListTasks();
        var cb = function() {
            refresh.style.display = 'none';
            document.body.style.transform = 'translateY(0px)';
        };
        sendRequest(list, '/', cb);
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
        sendRequest(index, '/deletions');
    }, false);
}

function sendRequest(body, url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status != 200) {
            console.log(xhr.statusText);
        } else {
            document.body.innerHTML = xhr.responseText;
            if (typeof cb === 'function') {
                cb();
            }
        }
    }
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(body);
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
