function makeRequest(method, path, data, isJsonRequest, isJsonResponse, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, path);
    if (isJsonRequest) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(data);
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
            return;
        }
        if (Math.floor(xhr.status / 100) != 2) {
            return callback(xhr.status);
        }
        var result = isJsonResponse ? JSON.parse(xhr.responseText) : xhr.responseText;
        callback(null, result);
    };
    xhr.send(data);
}

export function createTodo(text, callback) {
    makeRequest('POST', '/todo', {text}, true, true, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result.id);
    });
}

export function getTodosList(callback) {
    makeRequest('GET', '/todos', '', false, true, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result.todos);
    });
}

export function deleteTodo(id, callback) {
    makeRequest('DELETE', '/todo',{id}, true, false, callback);
}

export function updateTodo(id, text, callback) {
    makeRequest('PUT', '/todo', {id, text}, true, false, callback);
}
