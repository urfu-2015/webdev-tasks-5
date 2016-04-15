'use strict'
const MongoClient = require('mongodb').MongoClient;
const tasksModel = require('./tasks');
const mongoUri = 'mongodb://polinakoval:web12345@ds011800.mlab.com:11800/polinakoval';
let connection;
let taskUp = {
    "todo": "updatrre",
    "orderNum": '3'
};
MongoClient.connect(mongoUri, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        connection = db;
        let task = tasksModel(connection);
        task.changeOrder({newNum: 2, oldNum: 1}).then(result => {
            connection.close();
        });
    }
});
