require('./main.css');

// Асихнронный запрос
/* eslint max-params: [2, 4] */
function callAjax(url, method, data, cb) {
    var xmlHttp;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if (cb) {
                cb(xmlHttp.responseText);
            }
        }
    };

    xmlHttp.open(method, url, true);

    if (data) {
        xmlHttp.setRequestHeader('Content-type', 'application/json');
        xmlHttp.send(JSON.stringify(data));
    } else {
        xmlHttp.send();
    }
}

var initialPoint;
var finalPoint;
var startTime;
var endTime;
// var lastEditForm;

document.addEventListener('touchstart', function (event) {
    // event.preventDefault();
    // event.stopPropagation();

    if (event.target.parentNode.nodeName === '#document') {
        return;
    }

    startTime = new Date();
    initialPoint = event.changedTouches[0];
    var data;
    var tempStr;
    var newTodo;
    var newTodoDiv;
    var beforeElem;

    // Получение фокуса
    if ((event.target.parentNode.nodeName !== '#document') &&
        (event.target.getAttribute('id') === 'newTodoText')) {
        event.target.focus();
    }

    // Ещё одно получение фокуса
    if ((event.target.parentNode.nodeName !== '#document') &&
        (event.target.getAttribute('class') === 'todohi-edit-block__input')) {
        tempStr = event.target.value;
        event.target.focus();
        event.target.value = '';
        event.target.value = tempStr;
    }

    // Добавление
    if ((event.target.parentNode.nodeName !== '#document') &&
        (event.target.getAttribute('id') === 'add-button')) {
        var newTodoText = document.getElementById('newTodoText').value;
        if (newTodoText !== '') {
            data = {text: document.getElementById('newTodoText').value};
            callAjax('/todos/add', 'put', data, function (response) {
                response = JSON.parse(response);
                beforeElem = document.getElementById('todoSection');
                newTodoDiv = document.createElement('div');
                newTodoDiv.setAttribute('id', 'todo_' + response.id);
                newTodoDiv.setAttribute('class', 'todohi-item');
                newTodo = '<div class="todohi-item__todoha">' +
                    '<span class="todohi-item__title off-events">' + response.text + '</span>' +
                    '</div>';
                newTodoDiv.innerHTML = newTodo;
                beforeElem.insertBefore(newTodoDiv, beforeElem.children[0]);
            });
        }
    }

    // Удаление
    if ((event.target.parentNode.nodeName !== '#document') &&
        (event.target.parentNode.getAttribute('class') === 'todohi-item') &&
        (event.target.parentNode.getAttribute('id') !== 'addTodo') &&
        (event.target.getAttribute('class') === 'todohi-item__delete-button')) {
        data = {id: event.target.parentNode.getAttribute('id').replace(/\D/g, '')};
        callAjax('/todos/delete', 'delete', data, function (response) {
            response = JSON.parse(response);
            document.getElementById('todo_' + response.delId).remove();
        });
    }

    // Изменение
    if ((event.target.parentNode.nodeName !== '#document') &&
        (event.target.getAttribute('class') === 'todohi-edit-block__save-button')) {
        data = {
            id: event.target.parentNode.parentNode.parentNode.getAttribute('id').replace(/\D/g, ''),
            editText: event.target.parentNode.getElementsByTagName('input')[0].value
        };
        callAjax('/todos/edit', 'post', data, function (response) {
            response = JSON.parse(response);
            newTodo = '<div class="todohi-item__todoha">' +
                '<span class="todohi-item__title off-events">' + response.editText + '</span>' +
                '</div>';
            event.target.parentNode.parentNode.parentNode.innerHTML = newTodo;
        });
    }
});

document.addEventListener('touchend', function (event) {
    // event.preventDefault();
    // event.stopPropagation();

    endTime = new Date();
    finalPoint = event.changedTouches[0];
    var editForm;
    var newTodo;
    var newTodoDiv;

    // Редактирование по тапу
    if ((initialPoint.pageX === finalPoint.pageX) &&
        (initialPoint.pageY === finalPoint.pageY) &&
        (endTime - startTime) < 300) {
        if ((event.target.parentNode.nodeName !== '#document') &&
            (event.target.parentNode.getAttribute('class') === 'todohi-item') &&
            (event.target.parentNode.getAttribute('id') !== 'addTodo') &&
            (event.target.getAttribute('class') !== 'todohi-item__delete-button')) {
            editForm = '<div class="todohi-edit-block">' +
                    '<input class="todohi-edit-block__input" ' +
                        'value="' + event.target.getElementsByTagName('span')[0].innerText + '"' +
                        ' maxlength="12" required>' +
                    '<button class="todohi-edit-block__save-button">Сохранить</button>' +
                '</div>';
            event.target.innerHTML = editForm;
        }
    }

    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    var delBut;

    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX) {
                // СВАЙП left
                if ((event.target.parentNode.nodeName !== '#document') &&
                    (event.target.parentNode.getAttribute('class') === 'todohi-item') &&
                    (event.target.parentNode.getAttribute('id') !== 'addTodo')) {
                    if (event.target.parentNode.getElementsByTagName('img').length === 0) {
                        delBut = document.createElement('img');
                        delBut.setAttribute('class', 'todohi-item__delete-button');
                        delBut.setAttribute('src', '/trash.png');
                        event.target.parentNode.appendChild(delBut);
                    }
                }
            } else {
                // СВАЙП right
                /* eslint no-lonely-if: 0 */
                if ((event.target.parentNode.nodeName !== '#document') &&
                    (event.target.parentNode.getAttribute('class') === 'todohi-item') &&
                    (event.target.parentNode.getAttribute('id') !== 'addTodo')) {
                    delBut = event.target.parentNode.getElementsByTagName('img');
                    if (delBut.length === 1) {
                        delBut[0].remove();
                    }
                }
            }
        } else {
            // СВАЙП вниз (Обновление) + анимашка
            /* eslint no-lonely-if: 0 */
            if (finalPoint.pageY > initialPoint.pageY) {
                callAjax('/todos/all', 'get', undefined, function (response) {
                    var loadGif = document.getElementById('loadGif');
                    loadGif.setAttribute('class', 'loading-block');
                    response = JSON.parse(response);
                    var beforeElem = document.getElementById('todoSection');
                    var oldTodos = document.getElementsByClassName('todohi-item');
                    var forDel = [];

                    for (var i = 0; i < oldTodos.length; i++) {
                        if (oldTodos[i].getAttribute('id') !== 'addTodo') {
                            forDel.push(oldTodos[i]);
                        }
                    }

                    forDel.forEach(function (item) {
                        item.remove();
                    });

                    response.todos.reverse().forEach(function (todo) {
                        newTodoDiv = document.createElement('div');
                        newTodoDiv.setAttribute('id', 'todo_' + todo.id);
                        newTodoDiv.setAttribute('class', 'todohi-item');
                        newTodo = '<div class="todohi-item__todoha">' +
                            '<span class="todohi-item__title off-events">' + todo.text + '</span>' +
                            '</div>';
                        newTodoDiv.innerHTML = newTodo;
                        beforeElem.insertBefore(newTodoDiv, beforeElem.children[0]);
                    });
                    setTimeout(function () {
                        loadGif.setAttribute('class', 'loading-block__invisible');
                    }, 1000);
                });
            }
        }
    }
});
