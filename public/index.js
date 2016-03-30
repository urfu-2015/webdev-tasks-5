document.addEventListener('DOMContentLoaded', init);

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        return;
    }
    handleTouchStart(event);
});

document.addEventListener('touchend', function(event) {
    if (event.touches.length > 1) {
        return;
    }
    handleTouchEnd(event);
});

document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        return;
    }
    handleTouchMove(event);
});

document.addEventListener('scroll-load', handleDocumentScrollLoad);

function init (event) {
    request('GET', 'api/todos', null, renderTodos);
    document.querySelector('.root__add-button').addEventListener('tap', handleAddButtonTap);
}

function renderTodos (data) {
    var todosContainer = document.querySelector('#root__todos-container');
    todosContainer.innerHTML = '';

    data.todos.forEach(function(todo) {;
        todosContainer.appendChild(getTodoElement(todo));
    });
}

function getTodoElement (todo) {
    var todoElement = document.createElement('div');

    todoElement.classList.add('todos-container__todo', 'todo', 'todo_' + todo._id);
    todoElement.addEventListener('tap', function(event) {
        var _id = todo._id;
        handleTodoTap(event, _id);
    });
    todoElement.addEventListener('swipe-left', function (event) {
        var _id = todo._id;
        handleTodoSwipeLeft(event, _id);
    });
    todoElement.addEventListener('swipe-right', function (event) {
        var _id = todo._id;
        handleTodoSwipeRight(event, _id);
    });

    todoElement.appendChild(getTodoTextElement(todo.text));

    var deleteButton = document.createElement('div');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('todo__delete');
    deleteButton.addEventListener('tap', function(event) {
        var _id = todo._id;
        handleTodoDeleteTap(event, _id);
    });
    todoElement.appendChild(deleteButton);

    return todoElement;
}

function getTodoTextElement(text) {
    var todoText = document.createElement('div');

    todoText.classList.add('todo__text');
    todoText.innerHTML = text;

    return todoText;
}

var touch = {};

function handleTouchStart(event) {
    touch.startTime = (new Date()).getTime();
    touch.startPosition = {
        pageX: event.changedTouches[0].pageX,
        pageY: event.changedTouches[0].pageY
    };
    touch.startTarget = event.target;
}

function  handleTouchEnd(event) {
    document.querySelector('.root__load').style.top = '-30px';

    if (Math.abs(touch.startPosition.pageX - event.changedTouches[0].pageX) < 5 &&
        Math.abs(touch.startPosition.pageY - event.changedTouches[0].pageY) < 5)
    {
        event.target.dispatchEvent(new Event('tap', { bubbles: true }));
        return;
    }

    if (Math.abs(touch.startPosition.pageY - event.changedTouches[0].pageY) < 20 &&
        touch.startPosition.pageX - event.changedTouches[0].pageX > 50)
    {
        event.target.dispatchEvent(new Event('swipe-left', { bubbles: true }));
        return;
    }

    if (Math.abs(touch.startPosition.pageY - event.changedTouches[0].pageY) < 20 &&
        event.changedTouches[0].pageX - touch.startPosition.pageX > 50)
    {
        event.target.dispatchEvent(new Event('swipe-right', { bubbles: true }));
        return;
    }


    if (window.pageYOffset + 60 < event.changedTouches[0].pageY - touch.startPosition.pageY) {
        event.target.dispatchEvent(new Event('scroll-load', { bubbles: true }));
        return;
    }
}

function handleTouchMove(event) {
    if (window.pageYOffset + 60 >= event.changedTouches[0].pageY - touch.startPosition.pageY) {
        document.querySelector('.root__load').style.top =
            (-30 + event.targetTouches[0].pageY - touch.startPosition.pageY - window.pageYOffset)+'px';
    }
}

function handleTodoTap(event, id) {
    event.preventDefault();
    event.stopPropagation();

    showTodoForm(event.currentTarget, id);
}

function showTodoForm(todoElement, id) {
    if (todoElement.classList.contains('todo_swiped') || todoElement.classList.contains('todo_modification')) {
        return;
    } else {
        todoElement.classList.add('todo_modification');
    }

    var oldText = todoElement.firstChild.textContent;
    var todoForm = getTodoForm(oldText, id);

    todoElement.innerHTML = '';
    todoElement.appendChild(todoForm);
}

function handleTodoSwipeLeft(event, id) {
    if (event.currentTarget.classList.contains('todo_swiped') ||
        event.currentTarget.classList.contains('todo_modification'))
    {
        return;
    } else {
        event.currentTarget.classList.add('todo_swiped');
    }
}

function handleTodoSwipeRight(event, id) {
    if (!event.currentTarget.classList.contains('todo_swiped'))
    {
        return;
    } else {
        event.currentTarget.classList.remove('todo_swiped');
    }

}

function handleTodoDeleteTap(event, id) {
    request('DELETE', 'api/todos/' + id, {}, function () {
        var todosContainer = document.querySelector('#root__todos-container');
        var todoElement = document.querySelector('.todo_' + id);
        todosContainer.removeChild(todoElement);
    });
}

function handleDocumentScrollLoad() {
    document.querySelector('.root__load').classList.add('.root__load_spinning');
    request('GET', 'api/todos', null, function (todos) {
        renderTodos(todos);
        document.querySelector('.root__load').classList.remove('.root__load_spinning');
    });
}

function handleAddButtonTap(event) {
    request('POST', 'api/todos', { text: '' }, function (body) {
        var todosContainer = document.querySelector('#root__todos-container');
        var todoElement = getTodoElement(body);

        todosContainer.appendChild(todoElement);
        showTodoForm(todoElement, body._id);
    });
}

function getTodoForm(text, id) {
    var todoForm = document.createElement('div');
    todoForm.classList.add('todo__form', 'input-form');

    var todoInput = document.createElement('textarea');
    todoInput.classList.add('input-form__input');
    todoInput.textContent = text;
    todoInput.rows = 3;

    var todoSubmit = document.createElement('button');
    todoSubmit.classList.add('input-form__submit');
    todoSubmit.textContent = 'Сохранить';
    todoSubmit.addEventListener('tap', function (event) {
        var _id = id;
        handleSubmitChanges(event, _id);
    });

    todoForm.appendChild(todoInput);
    todoForm.appendChild(todoSubmit);
    return todoForm;
}

function handleSubmitChanges(event, id) {
    event.preventDefault();
    event.stopPropagation();

    var todo = document.querySelector('.todo_' + id);
    var newText = todo.firstChild.firstChild.value;

    request('PATCH', 'api/todos/' + id, {
        text: newText
    });

    var todosContainer = document.querySelector('#root__todos-container');
    var todoElement = getTodoElement({
        text: newText,
        _id: id
    });

    todosContainer.replaceChild(todoElement, todo);
}

function request(method, location, body, callback) {
    var req = new XMLHttpRequest();

    req.onload = function() {
        if (req.status >= 400) {
            console.log('Status ' + req.status);
            return;
        }
        if (callback !== undefined) {
            var parsedResponse = {};
            try {
                parsedResponse = JSON.parse(req.responseText);
            } catch (error) {
                parsedResponse = {};
            }
            callback(parsedResponse);
        }
    };

    req.ontimeout = function() {
       console.log('Request time expired');
    };

    req.timeout = 30000;
    req.open(method, location, true);
    if (body) {
        req.setRequestHeader('Content-type', 'application/json');
        req.send(JSON.stringify(body));
    } else {
        req.send();
    }
}