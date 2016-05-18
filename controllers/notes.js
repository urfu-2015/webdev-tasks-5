'use strict';

const Note = require('../models/note');

exports.list = (req, res) => {
    const notes = Note.findAll();
    console.log(notes);
    const data = {
        notes
    };
    res.send(data);
};

exports.item = (req, res) => {
    const name = req.params.name;
    const note = Note.find(name);

    if (!note) {
        res.sendStatus(404);
        return;
    }
    const data = {
        name: note.name,
        text: note.text
    };

    res.send(data);
};

exports.create = (req, res, next) => {
    const data = {
        text: req.body.text,
        createdAt: Date.now()
    };
    const note = new Note(data);
    note.save();
    next();
};

exports.delete = (req, res) => {
    console.log(req.body);
    const note = new Note(req.body);
    note.delete();
    res.sendStatus(204);
}

exports.error404 = (req, res) => res.sendStatus(404);
