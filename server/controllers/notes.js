'use strict';

const Note = require('../models/note');

exports.list = (req, res) => {
    let notes = Note.findAll();
    const data = {
        notes
    };

    res.render('main/main', Object.assign(data, req.commonData));
};

exports.create = (req, res) => {
    const data = {
        task: req.body.task
    };

    const note = new Note(data);
    note.save();

    res.json({task: note.task, id: note.id});
};

exports.delete = (req, res) => {
    let id = req.body.id;

    Note.delete(id);
    //console.log(Note.findAll());

    res.json({id});
};

exports.edit = (req, res) => {
    let id = req.body.id;
    let newText = req.body.newText;

    Note.edit(id, newText);

    res.json({id, newText});
};
