'use strict';

const MongoClient = require('mongodb').MongoClient;
const mongoUri = 'mongodb://polinakoval:web12345@ds011800.mlab.com:11800/polinakoval';
module.exports = () => {
    let connection;
    return (req, res, next) => {
        if (connection) {
            req.db = connection;
            next();
        } else {
            connection = MongoClient.connect(mongoUri, (err, db) => {
                if (err) {
                    next(err);
                } else {
                    connection = db;
                    req.db = connection;
                    next();
                }
            });
        }
    };
};
