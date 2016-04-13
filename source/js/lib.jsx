function onReadyStateChange(xhr, callback) {
    return function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (Math.floor(xhr.status / 100) != 2) {
            return callback(xhr.status);
        }
        callback(null, xhr.responseText)
    };
}

export function createTodo(text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/todo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = onReadyStateChange(xhr, (err, responseText) => {
        var res = JSON.parse(responseText);
        callback(err, res.id);
    });
    xhr.send(JSON.stringify({text}));
}

export function getTodosList(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/todos');
    xhr.onreadystatechange = onReadyStateChange(xhr, (err, responseText) => {
        var res = JSON.parse(responseText);
        callback(err, res.todos);
    });
    xhr.send();
}


export function deleteTodo(id, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/todo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = onReadyStateChange(xhr, (err, responseText) => {
        callback(err);
    });
    xhr.send(JSON.stringify({id}));
}

export function updateTodo(id, text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', '/todo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = onReadyStateChange(xhr, (err, responseText) => {
        callback(err);
    });
    xhr.send(JSON.stringify({id, text}));
}
