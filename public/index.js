document.addEventListener('DOMContentLoaded', loadTodos);

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

document.addEventListener('tap', function(event) {
    alert('tap');
});
document.addEventListener('swipe-left', function(event) {
    alert('swipe');
});
document.addEventListener('scroll-load', function(event) {
    alert('load');
});

function loadTodos (event) {
    console.log('!');
    request('GET', 'api/todos', null, renderTodos);
}

function renderTodos (data) {
    const todosContainer = document.getElementById('root__todos-container');
    todosContainer.innerHTML = '';

    data.todos.forEach(function(todo) {
        var todoElement = document.createElement('div');
        todoElement.classList.add('todos-container__todo', 'todo', 'todo_' + todo._id);
        todosContainer.appendChild(todoElement);

        var todoText = document.createElement('div');
        todoText.classList.add('todo__text');
        todoText.innerHTML = todo.text;
        todoElement.appendChild(todoText);
    });
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
    console.log(window.pageYOffset);
    console.log(event.changedTouches[0].pageX + ' ' + event.changedTouches[0].pageY);
    if (touch.startPosition.pageX === event.changedTouches[0].pageX &&
        touch.startPosition.pageY === event.changedTouches[0].pageY &&
        (new Date()).getTime() - touch.startTime < 200)
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

    if (window.pageYOffset + 50 < event.changedTouches[0].pageY - touch.startPosition.pageY) {
        event.target.dispatchEvent(new Event('scroll-load', { bubbles: true }));
        return;
    }
}

function request(method, location, body, callback) {
    const req = new XMLHttpRequest();

    req.onload = function() {
        if (req.status >= 400) {
            console.log('Status ' + req.status);
            return;
        }
        if (callback !== undefined) {
            callback(JSON.parse(req.responseText));
        }
    };

    req.ontimeout = function() {
       console.log('Request time expired');
    };

    req.timeout = 30000;
    req.open(method, location, true);
    req.setRequestHeader('ContentType', 'application/json');
    req.send(body);
}