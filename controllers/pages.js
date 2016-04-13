'use strict';

const Task = require('../models/task');

exports.index = (req, res) => {
    var data = {
        list: Task.findAll()
    };
    res.render('index', data);
};

exports.error404 = (req, res) => res.sendStatus(404);