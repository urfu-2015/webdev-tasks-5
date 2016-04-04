'use strict';

const fs = require('fs');

function readNotes() {
    const data = fs.readFileSync('./server/models/notes.txt', 'utf-8');
    try {
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

var notes = [];

function write() {
    fs.writeFile('./server/models/notes.txt', JSON.stringify(notes), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

class Note {
    constructor(data) {
        this.name = data.name;
    }

    save() {
        notes.push(this);
        write();
    }

    change(message) {
        this.name = message;
        write();
    }

    deleteNote() {
        notes.splice(notes.indexOf(this), 1);
        write();
    }

    static find(name) {
        return notes.filter(note => {
            return note.name === name;
        }).pop();
    }

    static findAll() {
        return notes;
    }

    static updateList(names) {
        var result = [];
        var clientNames = [];
        var note;
        names.forEach((name) => {
            note = Note.find(name);
            if (note) {
                clientNames.push(note);
            }
        });

        var i = 0;
        var j = 0;
        while (j < notes.length) {
            if (notes[j] === clientNames[i]) {
                result.push(notes[j]);
                i += 1;
                j += 1;
            } else if (i < clientNames.length && notes.indexOf(clientNames[i])) {
                result.push(clientNames[i]);
                i += 1;
            } else if (clientNames.indexOf(notes[j]) < 0) {
                result.push(notes[j]);
                j += 1;
            } else {
                j += 1;
            }
        }
        notes = result;
        return notes;
    }
}

readNotes().forEach((note) => {
    notes.push(new Note(note));
});

module.exports = Note;