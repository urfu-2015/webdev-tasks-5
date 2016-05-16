function buildRequest(method, data) {
    var request = {
        headers: {"Content-Type": "application/json"},
        method
    };
    if (data) {
        request.body = JSON.stringify(data);
    }
    return request;
}

export default function (url, method, data) {
    return fetch(url, buildRequest(method, data))
        .then(function (res) {
            return res.json();
        });
}
