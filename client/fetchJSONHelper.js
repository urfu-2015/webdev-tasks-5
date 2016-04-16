function getHeaders(method, data) {
    let headers = {};
    if (data) {
        headers = {
            headers: new Headers({'Content-type': 'application/json'}),
            method: method,
            body: JSON.stringify(data)
        };
    } else {
        headers = {
            headers: new Headers({'Content-type': 'application/json'}),
            method: method
        };
    }
    return headers;
}

export default (url, method, data = null) => {
    return fetch(url, getHeaders(method, data)).then(response => {
        return response.json();
    });
};
