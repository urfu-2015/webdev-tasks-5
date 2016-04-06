var express = require('express');
var TodoModel = require('../models/todo.js');
var router = express.Router();
var multer = require('multer');

router.get('/todos', function (req, res, next) {
    TodoModel.find({}, '_id text prev next', function (err, todos) {
        res.send(todos);
    });
});

router.post('/todos', function (req, res, next) {
    TodoModel.find({next: null}, '_id', function (err, oldTodo) {
        new TodoModel({
            text: req.body.text,
            prev: oldTodo[0] ? oldTodo[0]._id : null
        }).save(function (err, insertedData) {
            if (err) {
                console.error(err);
            } else {
                if (oldTodo[0]) {
                    TodoModel.findByIdAndUpdate(oldTodo[0]._id, {next: insertedData._id},
                        function (err, data) {
                            if (err) {
                                req.status = 404;
                                console.error(err);
                            } else {
                                res.send(insertedData);
                            }
                        });
                } else {
                    res.send(insertedData);
                }
            }
        });
    });
});

router.delete('/todos/:id', function (req, res, next) {
    TodoModel.find({_id: req.params.id}, '_id prev next', function (err, oldTodo) {
        Promise.all([
            TodoModel.findByIdAndUpdate(oldTodo[0].prev, {next: oldTodo[0].next}).exec(),
            TodoModel.findByIdAndUpdate(oldTodo[0].next, {prev: oldTodo[0].prev}).exec(),
            TodoModel.remove({_id: req.params.id}).exec()
        ]).then(function () {
            res.send({});
        });
    });
});

router.patch('/todos/:id', function (req, res, next) {
    TodoModel.findByIdAndUpdate(req.params.id, {text: req.body.text},
        function (err, data) {
            if (err) {
                req.status = 404;
                console.error(err);
            } else {
                res.send({_id: data._id, text: req.body.text});
            }
        });
});

router.patch('/todos/:id/reorder', function (req, res, next) {
    TodoModel.findById(req.body.moveId, '_id prev next', function (err, moveTodo) {

        var overId = req.body.overId;

        var updates = [];
        if (moveTodo.prev) {
            updates.push(update(moveTodo.prev, {next: moveTodo.next}));
        }
        if (moveTodo.next) {
            updates.push(update(moveTodo.next, {prev: moveTodo.prev}));
        }
        if (overId === -1) { // переносим в начало списка
            updates.push(TodoModel.find({next: null}).exec().then(function (lastTodo) {
                if (lastTodo[0]) {
                    lastTodo = lastTodo[0];
                    return Promise.all([
                        update(lastTodo._id, {next: moveTodo._id}),
                        update(moveTodo._id, {prev: lastTodo._id, next: null})
                    ]).catch(function (err) {
                        console.log(err);
                    });
                }
            }));
        } else { // переносим в середину или конец списка
            updates.push(TodoModel.findById(overId).exec().then(function (overTodo) {
                var updates = [
                    update(overTodo._id, {prev: moveTodo._id}),
                    update(moveTodo._id, {next: overTodo._id, prev: overTodo.prev})
                ];
                if (overTodo.prev != null) {
                    updates.push(update(overTodo.prev, {next: moveTodo._id}));
                }
                return Promise.all(updates).catch(function (err) {
                    console.log(err);
                });
            }).catch(function (err) {
                console.log(err);
            }));
        }
        Promise.all(updates).then(function () {
            TodoModel.find({}, '_id text prev next', function (err, todos) {
                res.send(todos);
            });
        }).catch(err, function () {
            console.log(err);
        });
    });
});

var update = function (id, data) {
    return TodoModel.findByIdAndUpdate(id, data).exec();
};

module.exports = router;
