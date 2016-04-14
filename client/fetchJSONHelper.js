export default (method, data) => {
    return {
        method: method,
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify(data)
    };
};
