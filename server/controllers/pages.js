'use strict';

let notes = [
    'Сходить к бабушке',
    'Прогуляться по парку',
    'Что-нибудь еще поделать'
];

exports.index = (req, res) => {
    res.render('main/index');
};

exports.getNotes = (req, res) => {
    var data = {
        notes: notes
    };
    res.send(data);
};

exports.changeNote = (req, res) => {
    var idx = notes.indexOf(req.body.oldText);
    if (idx < 0) {
        res.sendStatus(417);
    } else {
        notes[idx] = req.body.newText;
        res.sendStatus(200);
    }
};

exports.addNote = (req, res) => {
    notes.push(req.body.text);
    res.sendStatus(200);
};

exports.removeNote = (req, res) => {
    var idx = notes.indexOf(req.body.text);
    if (idx < 0) {
        res.sendStatus(400);
    } else {
        notes.splice(idx, 1);
        res.sendStatus(200);
    }
};

exports.error404 = (req, res) => res.sendStatus(404);
