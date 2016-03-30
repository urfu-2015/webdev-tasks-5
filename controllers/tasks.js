'use strict';

const Task = require('../models/task');

exports.list = (req, res) =>  {
    const tasks = Task.findAll();
    res.send(tasks);
};

exports.delete = (req, res) => {
    Task.delete(req.params.id);
    res.send(Task.findAll());
};
exports.shift = (req, res) => {
    Task.changePosition(req.body.id, req.body.number);
    res.send(Task.findAll());
};

exports.create = (req, res) => {
    // console.log(req.body.text);
    const task = new Task({text: req.body.text});

    task.save();

    res.send(Task.findAll());
};
exports.change = (req, res) => {
    Task.change(req.body.id, req.body.text);

    res.send(Task.findAll());
};

// exports.item = (req, res) => {
//     const name = req.params.name;
//     const note = Note.find(name);

//     if (!note) {
//         res.sendStatus(404);

//         return;
//     }

//     const data = {
//         name: note.name,
//         text: note.text
//     };

//     res.render('note', Object.assign(data, req.commonData));
// };
