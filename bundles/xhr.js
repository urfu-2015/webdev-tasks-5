function naiveSort(linkedList) {
    var sortedList = [];
    var index = 0;
    var previousItemId = null;

    while (sortedList.length < linkedList.length) {
        var current = linkedList[index];
        if (current.prev === previousItemId) {
            previousItemId = current._id;
            sortedList.push(current);
            index = 0;
        } else {
            index += 1;
        }
    }

    return sortedList.reverse();
}

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
        if (err) {
            console.error(err);
        } else {
            sortData = naiveSort(data);
            callback(sortData);
        }
    });
};

module.exports.add = function (data, callback) {
    request('POST', '/todos', data, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            callback(data);
        }
    });
};

module.exports.update = function (data, callback) {
    request('PATCH', '/todos/' + data._id, data, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            callback(data);
        }
    });
};

module.exports.reorder = function (data, callback) {
    request('PATCH', '/todos/' + data.moveId + '/reorder', data, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            callback(naiveSort(data));
        }
    });
};

module.exports.delete = function (data, callback) {
    request('DELETE', '/todos/' + data._id, data, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            callback(data);
        }
    });
};
