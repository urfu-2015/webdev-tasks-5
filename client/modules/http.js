export const sendRequest = (method, url, data, callback) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
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
};
