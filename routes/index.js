var express = require('express');
var router = express.Router();

var client = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1/test';

var connectedDb;

function connect(callback) {
    if (connectedDb) {
        return callback(null, connectedDb);
    }
    client.connect(url, (err, db) => {
        connectedDb = db;
        callback(err, db);
    });
}

/* GET home page. */
router.get('/', function (req, res) {
    res.render('main');
});

router.post('/todo', function (req, res) {
    var text = req.body.text;
    connect((err, db) => {
        db.collection('todos').insertOne({text})
        .then((result) => {
            if (!result.insertedCount) {
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

    connect((err, db) => {
        db.collection('todos').updateOne({_id: id}, {text: newText});
        res.status(204);
        res.send();
    });
});

router.delete('/todo', function (req, res) {
    var id = ObjectID(req.body.id);
    connect((err, db) => {
        db.collection('todos').remove({_id: id})
        .then((commandResult) => {
            var removed = commandResult.result.n;
            res.status(!err && removed ? 204 : 404);
            res.send();
        });
    });
});

router.get('/todos', function (req, res) {
    connect((err, db) => {
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

