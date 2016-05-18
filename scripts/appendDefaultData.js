var TodoModel = require('../models/todo.js');

module.exports = function () {
    TodoModel.count({}, function (err, count) {
        if (!count) {
            new TodoModel({
                text: 'Pull to Create Item',
                prev: null
            }).save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
};