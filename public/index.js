var current = '';

function addListenerToButton(elem, text) {
    elem.addEventListener('click', function (event) {
        var body = 'text=' + text;
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(body);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.body.innerHTML = xhr.responseText;
            }
        };
    }, false);
}

function addListenerToSpan(elem) {
    elem.addEventListener('touchstart', function (event) {
        if (event.targetTouches.length == 1) {
            var input = document.createElement('input');
            input.className = 'todo-list__task-input';
            input.type = 'text';
            current = elem.innerHTML;
            input.value = elem.innerHTML;
            addListenerToInput(input);
            elem.parentNode.replaceChild(input, elem);
        }
    }, false);
}

var tasks = document.getElementsByClassName('todo-list__task');
Array.prototype.forEach.call(tasks, (elem, index, array) => addListenerToSpan(elem));

function addListenerToInput(elem) {
    elem.addEventListener('touchstart', function (event) {
        if (event.targetTouches.length == 1) {
            var span = document.createElement('span');
            span.className = 'todo-list__task';
            span.innerHTML = elem.value;
            var body = 'oldText=' + current +
                '&newText=' + elem.value;
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', '/', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(body);
            addListenerToSpan(span);
            elem.parentNode.replaceChild(span, elem);
        }
    }, false);
}

var taskInputs = document.getElementsByClassName('todo-list__task-input');
Array.prototype.forEach.call(taskInputs, (elem, index, array) => addListenerToInput(elem));

var startPoint = {};
var nowPoint;
var ldelay;

tasks = document.getElementsByClassName('todo-list__element');
Array.prototype.forEach.call(tasks, (elem, index, array) => addListenersToLi(elem));

function addListenersToLi(elem) {
    elem.addEventListener('touchstart', function (event) {
        //event.preventDefault();
        event.stopPropagation();
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        ldelay = new Date();
    }, false);

    elem.addEventListener('touchmove', function (event) {
        event.preventDefault();
        //event.stopPropagation();
        var otk = {};
        nowPoint = event.changedTouches[0];
        otk.x = nowPoint.pageX - startPoint.x;
        var span;
        if (Math.abs(otk.x) > 100) {
            if (otk.x < 0 && elem.firstElementChild.nodeName == 'SPAN') {
                console.log(elem.firstElementChild);
                var button = document.createElement('button');
                button.value = elem.firstElementChild.innerHTML;
                button.innerHTML = 'Удалить';
                addListenerToButton(button, elem.firstElementChild.innerHTML);
                span = elem.firstElementChild;
                elem.replaceChild(button, span);
            }
            if (otk.x > 0 && elem.firstElementChild.nodeName == 'BUTTON') {
                span = document.createElement('span');
                span.className = 'todo-list__task';
                span.innerHTML = elem.firstElementChild.value;
                button = elem.firstElementChild;
                elem.replaceChild(span, button);
                addListenerToSpan(span);
            }
        }
    }, false);
}

document.body.addEventListener('touchstart', function (event) {
    //event.preventDefault();
    event.stopPropagation();
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
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '/', true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        document.body.innerHTML = xhr.responseText;
                    }
                };
                xhr.send();
            }
        }
    }
}, false);
