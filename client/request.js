"use strict";

/* eslint max-params: [2, 4] */
export default (type, url, data, cb) => {
    var xhr = new XMLHttpRequest();

    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 202) {
            cb();
            return;
        }
        if (xhr.status === 200) {
            cb(null, JSON.parse(xhr.responseText));
        } else {
            cb({status: xhr.status, text: xhr.statusText});
        }
    };
};
