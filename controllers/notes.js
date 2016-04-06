'use strict';

const Note = require('../models/note');

exports.list = (req, res) => {
    const notes = Note.findAll();
    const data = {
        notes: notes
    };
    res.send(data);
};

exports.remove = (req, res) => {
    Note.remove(req.body.text);
    res.status(204);
    res.send();
};

exports.update = (req, res) => {
    Note.update(req.body.oldValue, req.body.newValue);
    res.status(204);
    res.send();
};

exports.create = (req, res) => {
    const data = {
        text: req.body.text,
        createdAt: Date.now()
    };
    const note = new Note(data);
    note.save();
    res.send();
};
