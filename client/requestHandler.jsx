
//import React from 'react';

//callback принимает err,data
function request (method, path, callback) {
    return function () {
        let xhr = new XMLHttpRequest();
        xhr.open(method, path, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status != 200) {
                callback(xhr.status + ': ' + xhr.statusText);
            } else {
                console.log('here');
                callback(
                    undefined,
                    xhr.responseText
                );
                //dispatch(xhr.responseText);
            }
        };
    }
}

export default request;