'use strict';

const fs = require('fs');

function readNotes() {
    const data = fs.readFileSync('./models/notes.txt', 'utf-8');
    //console.log(data);
    try {
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

const notes = [];

function write() {
    fs.writeFile('./models/notes.txt', JSON.stringify(notes), (err) => {
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
}

readNotes().forEach((note) => {
    notes.push(new Note(note));
});
console.log(notes);

module.exports = Note;