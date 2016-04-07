'use strict';

const memoryStorage = [];

class Note {
    constructor(props) {
        this.text = props.text;
    }

    save() {
        memoryStorage.unshift(this);
    }

    delete() {
        var index = memoryStorage.indexOf(this);
        memoryStorage.splice(index, 1);
        return memoryStorage;
    }

    static find(name) {
        return memoryStorage.filter(note => note.name === name).pop();
    }

    static findAll() {
        return memoryStorage;
    }
}

var testNote = new Note({text: 'Test-note'});
memoryStorage.push(testNote)
module.exports = Note;
