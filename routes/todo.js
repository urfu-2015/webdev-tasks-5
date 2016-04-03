var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var Todo = require('../model/todo');
var todo = new Todo();

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        res.json(todo.getAllTodoReverse());
    })
    .post((req, res, next) => {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            if ('todo' in fields && !err) {
                res.json(todo.addTodo(fields['todo']));
            } else {
                res.status(400).json({error: "not field todo"})
            }
        })
    });

router.route('/:id')
    .delete((req, res, next)=> {
        if (todo.delTodo(req.params.id)) {
            res.json(this.message_delete);
        } else {
            res.status(500).json(this.error_not_foind);
        }
    })
    .put((req, res, next) => {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            if ('todo' in fields && !err) {
                res.json(todo.addTodo(fields['todo']));
            } else {
                res.status(400).json({error: "not field todo"})
            }
            res.json(todo.delTodo(req.params.id))
        })
    })
    .get((req, res) => {
        var todo = todo[req.params.id];
        if (todo !== undefined) {
            res.json(todo);
        } else {
            res.json({message: 'Not found!'});
        }

    });
module.exports = router;
