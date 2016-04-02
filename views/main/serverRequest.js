function request(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Access', 'application/json;');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            callback({status: xhr.status, content: xhr.statusText});
        } else {
            callback(null, JSON.parse(xhr.responseText));
        }
    };
}

function getNumFromClassName(className) {
    return className.split('num_').pop();
}

module.exports.addTask = function (task) {
    return new Promise((resolve, reject) => {
        request('POST', '/addTask', task, function (err, task) {
            if (err) {
                reject(err);
            }
            resolve(task);
        });
    });
}

module.exports.updateTask = function (task) {
    return new Promise((resolve, reject) => {
        request('POST', '/updateTask', task, function (err, task) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

module.exports.removeTask = function (task) {
    return new Promise((resolve, reject) => {
        request('POST', '/removeTask', task, function (err, task) {
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
}
