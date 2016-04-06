var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var Todo = require('../model/todo');
var todo = new Todo();

todo.addTodo('asda1');
todo.addTodo('asda2');

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        res.json(todo.getAllTodoReverse());
    })
    .post((req, res, next) => {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            console.log(fields);
            if ('todo' in fields && !err) {
                res.json(todo.addTodo(fields['todo']));
            } else {
                res.status(404).json(todo.error_not_found_field);
            }
        })
    });

router.route('/:id')
    .delete((req, res, next)=> {
        if (todo.delTodo(req.params.id)) {
            res.json(this.message_delete);
        } else {
            res.status(404).json(todo.error_not_found);
        }
    })
    .put((req, res, next) => {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            if ('todo' in fields && !err) {
                var update_todo = todo.updateTodo(req.params.id, fields['todo']);
                if (update_todo) {
                    res.json(update_todo);
                } else {
                    res.status(404).json(todo.error_not_found);
                }
                res.json();
            } else {
                res.status(400).json(todo.error_not_found_field);
            }
        })
    })
    .get((req, res) => {
        var get_todo = todo.getTodo(req.params.id);
        if (get_todo) {
            res.json(get_todo);
        } else {
            res.status(404).json(todo.error_not_found);
        }

    });
module.exports = router;
