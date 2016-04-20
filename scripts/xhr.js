var listSort = require('./sort.js');

function request(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status !== 200) {
            callback({
                status: xhr.status,
                content: xhr.statusText
            });
        } else {
            callback(null, JSON.parse(xhr.responseText));
        }
    };

    xhr.send(JSON.stringify(data));
}

module.exports.getAll = function (callback) {
    request('GET', '/todos', undefined, function (err, data) {
        err ? console.error(err) : callback(listSort(data));
    });
};

module.exports.add = function (data, callback) {
    request('POST', '/todos', data, function (err, data) {
        err ? console.error(err) : callback(data);
    });
};

module.exports.update = function (data, callback) {
    request('PATCH', '/todos/' + data._id, data, function (err, data) {
        err ? console.error(err) : callback(data);
    });
};

module.exports.reorder = function (data, callback) {
    request('PATCH', '/todos/' + data.moveId + '/reorder', data, function (err, data) {
        err ? console.error(err) : callback(listSort(data));
    });
};

module.exports.delete = function (data, callback) {
    request('DELETE', '/todos/' + data._id, data, function (err, data) {
        err ? console.error(err) : callback(data);
    });
};
