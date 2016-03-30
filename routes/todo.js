var express = require('express');
var TodoModel = require('../models/todo.js');
var router = express.Router();
var multer  = require('multer');
var form = multer();

router.get('/', function(req, res, next) {
    TodoModel.find({}, '_id text', function (err, todos) {
        res.send(todos);
    });
});

router.post('/', form.array(), function(req, res, next) {
    new TodoModel({
        text: req.body.text
    }).save(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send({_id: data._id, text: data.text});
        }
    });
});

router.delete('/:id', function(req, res, next) {
    TodoModel.remove({_id: req.params.id}, function (err, data) {
        console.log(data);
        if (err) {
            req.status = 404;
            console.log(err);
        } else {
            res.send();
        }
    });
});

router.patch('/:id', form.array(), function(req, res, next) {
    TodoModel.findByIdAndUpdate(req.params.id, {text: req.body['update-text']}, function (err, data) {
        if (err) {
            req.status = 404;
            console.log(err);
        } else {
            res.send({_id: data._id, text: req.body['update-text']});
        }
    });
});

module.exports = router;
