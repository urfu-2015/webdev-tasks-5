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
    console.log('create', data);
    const note = new Note(data);
    note.save();
    res.send(data);
};

exports.change = (req, res) => {
    const note = Note.find(req.body.name);
    console.log('change', note, 'to', req.body.changeNote);
    note.change(req.body.changeNote);
    res.send(note); // ?
};

exports.deleteNote = (req, res) => {
    const note = Note.find(req.body.name);
    console.log('delete', note);
    note.deleteNote();
    res.send(note); // ?
};

exports.error404 = (req, res) => {
    res.sendStatus(404);
};
