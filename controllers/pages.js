'use strict';

const todos = require('./todos');

exports.error404 = function (requset, response) {
    response.sendStatus(404);
};