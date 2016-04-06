
import React from 'react';

export default (method, path, callback, body = '') => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            callback(xhr.status + ': ' + xhr.statusText);
        } else {
            let result = JSON.parse(xhr.responseText);
            callback(undefined, result);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    //xhr.send('text=' + encodeURIComponent(text));
};
