'use strict';

const memoryStorage = [];

class Note {
    constructor(props) {
        this.text = props.text;
        this.createdAt = props.createdAt;
    }

    save() {
        memoryStorage.push(this);
    }

    static find(name) {
        return memoryStorage.filter(note => note.name === name).pop();
    }

    static findAll() {
        return memoryStorage;
    }
}
