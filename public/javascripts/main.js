var ids = {};

window.onload = function () {
    addEventListeners();
    updateTodos();
};

function addEventListeners() {
    var createButtton = document.querySelector('.create-block .button');
    createButtton.addEventListener('touchstart', function () {
        var textField = document.querySelector('.create-block .text');
        var text = textField.value;
        createTodo(text, function (err, id) {
            if (err) {
                return alert(err);
            }
            addTodoItem(id, text);
            textField.value = '';
        });
    });
}

function updateTodos() {
    getTodosList(function (err, todos) {
        if (err) {
            return alert(err);
        }
        var todo_list = document.getElementsByClassName('todo-list')[0];
        while (todo_list.firstChild) {
            todo_list.removeChild(todo_list.firstChild);
        }

        todos.forEach(function (todo) {
            addTodoItem(todo.id, todo.text);
        });
    });
}

function switchEditToItem(editBlock, text) {
    var id = Object.keys(ids).filter(function (id) {
        return ids[id] === editBlock;
    })[0];

    var itemBlock = makeItemBlock(id, text);

    ids[id] = itemBlock;
    editBlock.parentNode.replaceChild(itemBlock, editBlock);
}

function swtchItemToEdit(itemBlock) {
    var id = Object.keys(ids).filter(function (id) {
        return ids[id] === itemBlock;
    })[0];

    var editBlock = document.createElement('div');
    editBlock.classList.add('todo-list__edit-block');

    var edit = document.createElement('div');
    edit.classList.add('edit');
    editBlock.appendChild(edit);

    var textarea = document.createElement('textarea');
    textarea.classList.add('text');
    textarea.setAttribute('rows', '3');
    textarea.style.resize = 'none';
    textarea.value = itemBlock.firstElementChild.innerHTML;
    edit.appendChild(textarea);

    var button = document.createElement('button');
    button.classList.add('button');
    button.setAttribute('type', 'button');
    button.innerHTML = 'Сохранить';
    button.addEventListener('touchstart', function () {
        updateTodo(id, textarea.value, function (err) {
            if (err) {
                return alert(err);
            }
            switchEditToItem(editBlock, textarea.value);
        });
    });
    edit.appendChild(button);

    ids[id] = editBlock;
    itemBlock.parentNode.replaceChild(editBlock, itemBlock);
}

function makeItemBlock(id, text) {
    var itemBlock = document.createElement('div');
    itemBlock.classList.add('todo-list__item-block');

    var item = document.createElement('div');
    item.classList.add('item');
    if (text) {
        item.innerHTML = text;
    }
    itemBlock.appendChild(item);

    var startPoint;
    var swiped;
    item.addEventListener('touchstart', function (event) {
        event.preventDefault();
        event.stopPropagation();
        startPoint = event.changedTouches[0];
        swiped = false;

        setTimeout(function () {
            if (!swiped) {
                swiped = true;
                swtchItemToEdit(item.parentNode);
            }
        }, 100);
    });

    item.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (swiped) {
            return;
        }
        var newPoint = event.changedTouches[0];
        var dx = newPoint.pageX - startPoint.pageX;
        if (dx < -2) {
            item.classList.add('item--swiped');
        } else {
            item.classList.remove('item--swiped');
        }
        startPoint = newPoint;
        swiped = true;
    });

    var button = document.createElement('div');
    button.classList.add('button');
    button.setAttribute('type', 'button');
    button.addEventListener('touchstart', function () {
        deleteTodo(id, function (err) {
            if (err) {
                return alert(err);
            }
            ids[id] = undefined;
            item.parentNode.remove();
        });
    });
    itemBlock.appendChild(button);
    return itemBlock;
}

function addTodoItem(id, text) {
    var todo_list = document.getElementsByClassName('todo-list')[0];
    var todoItem = makeItemBlock(id, text);

    ids[id] = todoItem;
    todo_list.appendChild(todoItem);
}
//server
function deleteTodo(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/todo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status != 204) {
            return callback(xhr.status);
        }
        callback(null);
    };
    xhr.send(JSON.stringify({id}));
}

function createTodo(text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/todo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status != 201) {
            return callback(xhr.status);
        }
        var res = JSON.parse(xhr.responseText);
        callback(null, res.id);
    };
    xhr.send(JSON.stringify({text}));
}

function getTodosList(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/todos');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status != 200) {
            return callback(xhr.status);
        }
        var res = JSON.parse(xhr.responseText);
        callback(null, res.todos);
    };
    xhr.send();
}

function updateTodo(id, text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/todo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status != 204) {
            return callback(xhr.status);
        }
        callback(null);
    };
    xhr.send(JSON.stringify({id, text}));
}
