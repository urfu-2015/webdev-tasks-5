var current = '';

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
            xhr.open('POST', '/update', true);
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
                var form = document.createElement('form');
                form.method = 'POST';
                form.action = '/deletion';
                form.class = 'todo-list__deletion';
                form.innerHTML = '\<input type="hidden" name="text" value="' +
                    elem.firstElementChild.innerHTML + '"\>' +
                    '\<input type="submit" value="Удалить" ' +
                    'class="todo-list__deletion-button"\>';
                span = elem.firstElementChild;
                elem.replaceChild(form, span);
            }
            if (otk.x > 0 && elem.firstElementChild.nodeName == 'FORM') {
                span = document.createElement('span');
                span.className = 'todo-list__task';
                span.innerHTML = elem.firstElementChild.firstElementChild.value;
                form = elem.firstElementChild;
                elem.replaceChild(span, form);
                addListenerToSpan(span);
            }
        }
    }, false);

    elem.addEventListener('touchend', function (event) {
        var pdelay = new Date();
        nowPoint = event.changedTouches[0];
        var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
        var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
        if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime() - ldelay.getTime()) < 200) {
            if (xAbs > yAbs) {
                if (nowPoint.pageX < startPoint.x && elem.firstElementChild.nodeName == 'SPAN') {
                    var form = document.createElement('form');
                    form.method = 'POST';
                    form.action = '/deletion';
                    form.class = 'todo-list__deletion';
                    form.innerHTML = '\<input type="hidden" name="text" value="' +
                        elem.firstElementChild.innerHTML + '"\>' +
                        '\<input type="submit" value="Удалить" ' +
                        'class="todo-list__deletion-button"\>';
                    span = elem.firstElementChild;
                    elem.replaceChild(form, span);
                }
                if (nowPoint.pageX < startPoint.x && elem.firstElementChild.nodeName == 'FORM') {
                    span = document.createElement('span');
                    span.className = 'todo-list__task';
                    span.innerHTML = elem.firstElementChild.firstElementChild.value;
                    form = elem.firstElementChild;
                    elem.replaceChild(span, form);
                    addListenerToSpan(span);
                }
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

document.body.addEventListener('touchend', function (event) {
    var pdelay = new Date();
    nowPoint = event.changedTouches[0];
    var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
    var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
    if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime() - ldelay.getTime()) < 200) {
        if (xAbs < yAbs) {
            console.log('I swiped!');
            if (nowPoint.pageY >= startPoint.y) {
                var img = document.createElement('img');
                img.src = 'loader.gif';
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
