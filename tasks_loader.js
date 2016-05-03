'use strict';

const fs = require('fs');

const taskFilePath = './todo.json';
module.exports = {
    tasks: require(taskFilePath)
};
