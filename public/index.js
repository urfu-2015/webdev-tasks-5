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
            xhr.setRequestHeader('Content-length', body.length);
            xhr.send(body);
            addListenerToSpan(span);
            elem.parentNode.replaceChild(span, elem);
        }
    }, false);
}

var taskInputs = document.getElementsByClassName('todo-list__task-input');
Array.prototype.forEach.call(taskInputs, (elem, index, array) => addListenerToInput(elem));
