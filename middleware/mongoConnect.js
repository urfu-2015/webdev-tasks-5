'use strict';

const MongoClient = require('mongodb').MongoClient;
const config = require('fs').readFileSync('config.json', 'utf-8');
const dbConfig = JSON.parse(config).db;
const mongoUri = `mongodb://${dbConfig.login}:${dbConfig.password}` +
    `@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
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
