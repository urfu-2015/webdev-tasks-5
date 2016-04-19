
module.exports.sendRequest = function (data, options, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, options.path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (options.headers) {
        Object.keys(options.headers).forEach(function (header) {
            xhr.setRequestHeader(header, options.headers[header]);
        });
    }

    data ? xhr.send(JSON.stringify(data)) : xhr.send();

    var successCode = null;
    if (new Set(['GET', 'PATCH', 'DELETE']).has(options.method)) {
        successCode = 200;
    } else {
        options.method === 'POST' ? successCode = 201 : null;
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status === successCode) {
            cb(xhr);
        }
    };
};
