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

    function find(name) {
        return memoryStorage.filter(note => note.name === name).pop();
    }

    function findAll() {
        return memoryStorage;
    }
}
