'use strict';

(function () {
	window.XHR = {};
	
	var __makeQuery = function (method, url, body, cb) {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) {
				return;
			}
			cb(xhr.status, JSON.parse(xhr.responseText));
		};
		body ? xhr.send(body) : xhr.send();
		return xhr;
	};
	
	window.XHR.getJSON = function (url, cb) {
		__makeQuery('GET', url, undefined, cb);
	};
	
	window.XHR.postJSON = function (url, bodyObject, cb) {
		__makeQuery('POST', url, JSON.stringify(bodyObject), cb);
	};
	
	window.XHR.putJSON = function (url, bodyObject, cb) {
		__makeQuery('PUT', url, JSON.stringify(bodyObject), cb);
	};
	
	window.XHR.deleteJSON = function (url, cb) {
		__makeQuery('DELETE', url, undefined, cb);
	};
	
})();