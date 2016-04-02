'use strict';
var db = require('../db.js');

exports.all = (req, res) => {
    const todos = db[req.cookies['userToken']];
    if (todos) {
        res.json({status: 'ok', userTodo: todos});
    } else {
        res.json({status: 'failed', comment: 'No todo for user'});
    }
};

exports.add = (req, res) => {
    var userTodo = db[req.cookies['userToken']];
    if (userTodo) {
        userTodo[Object.keys(userTodo).length] = {
            text: req.body.text,
            createdAt: Date.now()
        };
    } else {
        userTodo = {};
        userTodo[0] = {
            text: req.body.text,
            createdAt: Date.now()
        };
        db[req.cookies['userToken']] = userTodo;
    }
    res.json({status: 'ok'});
};

exports.getById = (req, res) => {
    var userTodo = db[req.cookies['userToken']];
    if (userTodo) {
        if (userTodo[req.params.id]) {
            return res.json({status: 'ok', todo: userTodo[req.params.id]});
        }
    }
    res.json({status: 'failed', comment: 'No todo by given id'});
};

exports.putById = (req, res) => {
    var userTodo = db[req.cookies['userToken']];
    if (userTodo) {
        if (userTodo[req.params.id]) {
            userTodo[req.params.id].text = req.body.text;
            return res.json({status: 'ok', todo: userTodo[req.params.id]});
        }
    }
    res.json({status: 'failed', comment: 'No todo by given id'});
};

exports.deleteById = (req, res) => {
    var userTodo = db[req.cookies['userToken']];
    if (userTodo) {
        if (userTodo[req.params.id]) {
            delete userTodo[req.params.id];
            return res.json({status: 'ok'});
        }
    }
    res.json({status: 'failed', comment: 'No todo by given id'});
};