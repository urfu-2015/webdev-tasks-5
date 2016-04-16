'use strict';

const Note = require('../models/note');

exports.list = (req, res) => {
    const notes = Note.findAll();
    const data = { notes };
    res.send(data);
};

exports.remove = (req, res) => {
    Note.remove(req.body.id);
    res.sendStatus(204);
};

exports.update = (req, res) => {
    Note.update(req.body.id, req.body.newValue);
    res.sendStatus(204);
};

exports.create = (req, res) => {
    const data = {
        text: req.body.text,
        createdAt: req.body.id
    };
    const note = new Note(data);
    note.save();
    res.send();
};
