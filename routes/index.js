var express = require('express');
var router = express.Router();

var client = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1/test';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('main');
});

router.post('/todo', function (req, res) {
    var text = req.body.text;
    client.connect(url, (err, db) => {
        db.collection('todos').insertOne({text}, (err, result) => {
            if (err) {
                return res.status(404);
            }
            res.status(201);
            res.json({
                id: result.insertedId
            });
        });
    });
});

router.put('/todo', function (req, res) {
    var id = ObjectID(req.body.id);
    var newText = req.body.text;

    client.connect(url, (err, db) => {
        db.collection('todos').updateOne({_id: id}, {text: newText});
        res.status(204);
        res.send();
    });
});

router.delete('/todo', function (req, res) {
    var id = ObjectID(req.body.id);
    client.connect(url, (err, db) => {
        db.collection('todos').find({_id: id}, (err, result) => {
            if (err || !result) {
                return res.status(404);
            }

            db.collection('todos').remove({_id: id});
            res.status(204);
            res.send();
        });
    });
});

router.get('/todos', function (req, res) {
    client.connect(url, (err, db) => {
        db.collection('todos').find().toArray((err, todosList) => {
            if (err) {
                return res.status(404);
            }
            todosList = todosList.map((todo) => {
                return {
                    id: todo._id.toString(),
                    text: todo.text
                };
            });
            res.json({todos: todosList});
        });
    });
});

module.exports = router;

