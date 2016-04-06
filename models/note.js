'use strict';

const memoryStorage = [];

class Note {
    constructor(props) {
        this.text = props.text;
    }

    save() {
        memoryStorage.push(this);
        console.log(memoryStorage);
    }

    static find(name) {
        return memoryStorage.filter(note => note.name === name).pop();
    }

    static findAll() {
        return memoryStorage;
    }
}

module.exports = Note;
