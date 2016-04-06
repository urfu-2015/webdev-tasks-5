export function createTodo(text, callback) {
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

export function getTodosList(callback) {
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


export function deleteTodo(id, callback) {
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

export function updateTodo(id, text, callback) {
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
