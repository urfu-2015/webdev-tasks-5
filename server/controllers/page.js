'use strict';

const Note = require('../models/note');

exports.list = (req, res) => {
    const notes = Note.findAll();
    res.render('index/index', Object.assign({notes: notes}, req.commonData));
};

exports.getList = (req, res) => {
    const notes = Note.findAll();
    res.send(notes);
};

exports.create = (req, res) => {
    const data = {
        name: req.body.name
    };
    const note = new Note(data);
    note.save();
    res.send(data);
};

exports.change = (req, res) => {
    const note = Note.find(req.body.name);
    note.change(req.body.changeNote);
    res.send(note);
};

exports.deleteNote = (req, res) => {
    const note = Note.find(req.body.name);
    note.deleteNote();
    res.send(note);
};

exports.changeChain = (req, res) => {
    var names = [];
    for (var name in req.body) {
        if (req.body.hasOwnProperty(name)) {
            names.push(req.body[name]);
        }
    }
    var notes = Note.updateList(names).map(name => {
        return name.name;
    });
    res.send(notes);
};

exports.error404 = (req, res) => {
    res.sendStatus(404);
};
