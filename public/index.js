var current = '';

function render(tasks) {
    var template = require('./index.hbs');
    var elem = document.getElementById('todo-block');
    elem.innerHTML = template({tasks});
}

function sendXhr(method, address, body, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, address, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 204)) {
            callback(xhr.responseText);
        }
    };
    xhr.send(body);
}

document.body.addEventListener('touchstart', function (event) {
    var target = event.target;
    //if (target.classList.contains('todo-list__deletion-button')) {
    //    var text = target.value;
    //    var body = JSON.stringify({text: text});
    //    sendXhr('DELETE', '/', body, function (data) {
    //        target.parentNode.parentNode.removeChild(target.parentNode);
    //    });
    //}
    if (target.classList.contains('todo-list__text-to-create')) {
        target.focus();
    }
    //if (target.classList.contains('todo-list__task') && event.targetTouches.length == 1) {
    //    var input = document.createElement('input');
    //    input.className = 'todo-list__task-input';
    //    input.type = 'text';
    //    current = target.innerHTML;
    //    input.value = target.innerHTML;
    //    target.parentNode.replaceChild(input, target);
    //    input.focus();
    //}
    if (target.classList.contains('todo-list__task-input') && (event.targetTouches.length == 1)) {
        var span = document.createElement('span');
        span.className = 'todo-list__task';
        span.innerHTML = target.value;
        var body = JSON.stringify({oldText: current, newText: target.value});
        sendXhr('PUT', '/', body, function () {
            target.parentNode.replaceChild(span, target);
        });
    }
}, false);

function addListenerToCreationButton(elem) {
    elem.addEventListener('touchstart', function (event) {
        var creationInput = document.getElementsByClassName('todo-list__text-to-create');
        var text = creationInput[0].value;
        var body = JSON.stringify({message: text});
        var li = document.createElement('li');
        li.className = 'todo-list__element';
        li.innerHTML = '<span class="todo-list__task">' + text + '</span>';
        sendXhr('POST', '/', body, function (data) {
                document.getElementsByClassName('todo-list')[0].appendChild(li);
            });
        creationInput[0].value = '';
    }, false);
}

var creationButton = document.getElementsByClassName('todo-list__creation-button');
addListenerToCreationButton(creationButton[0]);

var startPoint = {};
var nowPoint;
var ldelay;

document.body.addEventListener('touchstart', function (event) {
    var target = event.target;
    //event.stopPropagation();
    if (target.classList.contains('todo-list__element')) {
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        ldelay = new Date();
    }
}, false);

document.body.addEventListener('touchend', function (event) {
    event.preventDefault();
    //event.stopPropagation();
    var target = event.target;
    if (target.classList.contains('todo-list__element')
        || target.classList.contains('todo-list__task')
        || target.classList.contains('todo-list__deletion-button')) {
        target = (target.classList.contains('todo-list__task')
            || target.classList.contains('todo-list__deletion-button'))
            ? target.parentNode
            : target;
        var displacement = {};
        nowPoint = event.changedTouches[0];
        displacement.x = nowPoint.pageX - startPoint.x;
        displacement.y = nowPoint.pageY - startPoint.y;
        if (Math.abs(displacement.x) < 100 && Math.abs(displacement.y) < 30
            && target.firstElementChild.nodeName == 'SPAN') {
            var input = document.createElement('input');
            input.className = 'todo-list__task-input';
            input.type = 'text';
            current = target.firstElementChild.innerHTML;
            input.value = current;
            target.replaceChild(input, target.firstElementChild);
            input.focus();
        }
        if (Math.abs(displacement.x) < 100 && Math.abs(displacement.y) < 30
            && target.firstElementChild.nodeName == 'BUTTON') {
            var text = target.firstElementChild.value;
            var body = JSON.stringify({text: text});
            sendXhr('DELETE', '/', body, function (data) {
                target.parentNode.removeChild(target);
            });
        }
        var span;
        if (displacement.x < -100 && target.firstElementChild.nodeName == 'SPAN') {
            var button = document.createElement('button');
            button.value = target.firstElementChild.innerHTML;
            button.innerHTML = 'Удалить';
            button.className = 'todo-list__deletion-button';
            span = target.firstElementChild;
            target.replaceChild(button, span);
        }
        if (displacement.x > 100 && target.firstElementChild.nodeName == 'BUTTON') {
            span = document.createElement('span');
            span.className = 'todo-list__task';
            span.innerHTML = target.firstElementChild.value;
            button = target.firstElementChild;
            target.replaceChild(span, button);
        }
    }
}, false);

document.body.addEventListener('touchstart', function (event) {
    //event.preventDefault();
    //event.stopPropagation();
    startPoint.x = event.changedTouches[0].pageX;
    startPoint.y = event.changedTouches[0].pageY;
    ldelay = new Date();
}, false);

document.body.addEventListener('touchmove', function (event) {
    //event.preventDefault();
    //event.stopPropagation();
    var displacement = {};
    nowPoint = event.changedTouches[0];
    displacement.y = nowPoint.pageY - startPoint.y;
    if (displacement.y > 100 && document.body.firstElementChild.nodeName != 'IMG') {
        var img = document.createElement('img');
        img.src = 'loader.gif';
        img.className = 'loader';
        document.body.insertBefore(img, document.body.firstChild);
        sendXhr('GET', '/json', {}, function (data) {
            document.getElementsByClassName('loader')[0].remove();
            render(JSON.parse(data).tasks);
        });
    }
}, false);
