var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');

var Todo = [
    {todo: 'qwert1'},
    {todo: 'qwert2'}
];
/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        res.json(Todo.reverse());
    })
    .post((req, res, next) => {
        var form = new multiparty.Form();
        form.parse(req, function (err, fields, files) {
            Todo.push(fields);
        });
        res.json({message: 'Todo add!'});
    });

router.route('/:id')
    .delete((req, res, next)=> {
        var id_todo = req.params.id;
        if (id_todo < Todo.length) {
            Todo.splice(id_todo, 1);
            res.json({message: 'Todo del!'});
        }
    })
    .put((req, res, next) => {
        var todo = Todo[req.params.id];
        if (typeof todo != 'undefined') {
            var form = new multiparty.Form();
            form.parse(req, function (err, fields, files) {
                todo['todo'] = fields['todo'];
            });
            res.json({message: 'Todo updated!'});
        } else {
            res.json({message: 'Not found!'});
        }
    })
    .get((req, res) => {
        var todo = Todo[req.params.id];
        if (typeof todo != 'undefined') {
            res.json(todo);
        } else {
            res.json({message: 'Not found!'});
        }

    });
module.exports = router;
