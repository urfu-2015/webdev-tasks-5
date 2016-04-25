export const request = (method, location, body, callback) => {
    var req = new XMLHttpRequest();

    req.onload = function() {
        if (req.status >= 400) {
            console.log('Status ' + req.status);
            return;
        }
        if (callback !== undefined) {
            var parsedResponse = {};
            try {
                parsedResponse = JSON.parse(req.responseText);
            } catch (error) {
                parsedResponse = {};
            }
            callback(parsedResponse);
        }
    };

    req.ontimeout = function() {
        console.log('Request time expired');
    };

    req.timeout = 30000;
    req.open(method, location, true);
    if (body) {
        req.setRequestHeader('Content-type', 'application/json');
        req.send(JSON.stringify(body));
    } else {
        req.send();
    }
}