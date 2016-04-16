var current = '';

function render(tasks) {
    var template = require('./index.hbs');
    var elem = document.getElementById('todo-block');
    elem.innerHTML = template({tasks});
}

function sendXhr(method, body, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, '/', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send(body);
}

document.body.addEventListener('touchstart', function (event) {
    var target = event.target;
    if (target.classList.contains('todo-list__deletion-button')) {
        var text = target.value;
        var body = 'text=' + text;
        sendXhr('DELETE', body, function (data) {
            render(JSON.parse(data).tasks);
        });
    }
    if (target.classList.contains('todo-list__text-to-create')) {
        target.focus();
    }
    if (target.classList.contains('todo-list__task')) {
        if (event.targetTouches.length == 1) {
            var input = document.createElement('input');
            input.className = 'todo-list__task-input';
            input.type = 'text';
            current = target.innerHTML;
            input.value = target.innerHTML;
            target.parentNode.replaceChild(input, target);
            input.focus();
        }
    }
    if (target.classList.contains('todo-list__task-input')) {
        if (event.targetTouches.length == 1) {
            var span = document.createElement('span');
            span.className = 'todo-list__task';
            span.innerHTML = target.value;
            var body = 'oldText=' + current +
                '&newText=' + target.value;
            sendXhr('PUT', body, function () {
                target.parentNode.replaceChild(span, target);
            });
        }
    }
}, false);

function addListenerToCreationButton(elem) {
    elem.addEventListener('touchstart', function (event) {
        var creationInput = document.getElementsByClassName('todo-list__text-to-create');
        var text = creationInput[0].value;
        var body = 'message=' + text;
        sendXhr('POST', body, function (data) {
                render(JSON.parse(data).tasks);
            });
    }, false);
}

var creationButton = document.getElementsByClassName('todo-list__creation-button');
addListenerToCreationButton(creationButton[0]);

var startPoint = {};
var nowPoint;
var ldelay;

document.body.addEventListener('touchstart', function (event) {
    var target = event.target;
    if (target.classList.contains('todo-list__element')) {
        //event.stopPropagation();
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        ldelay = new Date();
    }
}, false);

document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
    //event.stopPropagation();
    var target = event.target;
    if (target.classList.contains('todo-list__element')) {
        var otk = {};
        nowPoint = event.changedTouches[0];
        otk.x = nowPoint.pageX - startPoint.x;
        var span;
        if (Math.abs(otk.x) > 100) {
            if (otk.x < 0 && target.firstElementChild.nodeName == 'SPAN') {
                var button = document.createElement('button');
                button.value = target.firstElementChild.innerHTML;
                button.innerHTML = 'Удалить';
                button.className = 'todo-list__deletion-button';
                //addListenerToButton(button, target.firstElementChild.innerHTML);
                span = target.firstElementChild;
                target.replaceChild(button, span);
            }
            if (otk.x > 0 && target.firstElementChild.nodeName == 'BUTTON') {
                span = document.createElement('span');
                span.className = 'todo-list__task';
                span.innerHTML = target.firstElementChild.value;
                button = target.firstElementChild;
                target.replaceChild(span, button);
                //addListenerToSpan(span);
            }
        }
    }
}, false);

document.body.addEventListener('touchstart', function (event) {
    event.preventDefault();
    //event.stopPropagation();
    startPoint.x = event.changedTouches[0].pageX;
    startPoint.y = event.changedTouches[0].pageY;
    ldelay = new Date();
}, false);

document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
    //event.stopPropagation();
    var otk = {};
    nowPoint = event.changedTouches[0];
    otk.y = nowPoint.pageY - startPoint.y;
    if (Math.abs(otk.y) > 100) {
        if (otk.y > 0) {
            if (document.body.firstElementChild.nodeName != 'IMG') {
                var img = document.createElement('img');
                img.src = 'loader.gif';
                img.className = 'loader';
                document.body.insertBefore(img, document.body.firstChild);
                sendXhr('GET', {}, function (data) {
                    document.getElementsByClassName('loader')[0].remove();
                    render(JSON.parse(data).tasks);
                });
            }
        }
    }
}, false);
