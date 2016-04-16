'use strict';

const memoryStorage = [];

class Note {
    constructor(props) {
        this.text = props.text;
        this.createdAt = props.createdAt;
    }

    save() {
        memoryStorage.unshift(this);
    }

    static find(text) {
        return memoryStorage.filter(note => note.text === text).pop();
    }

    static findAll() {
        return memoryStorage;
    }

    static remove(createdAt) {
        memoryStorage.forEach((obj, i, memoryStorage) => {
            if (obj.createdAt === createdAt) {
                memoryStorage.splice(i, 1);
            }
        });
    }

    static update(createdAt, newText) {
        memoryStorage.forEach((obj, i, memoryStorage) => {
            if (obj.createdAt === createdAt) {
                obj.text = newText;
            }
        });
    }
}

memoryStorage.push(new Note({
    text: 'cakes',
    createdAt: Date.now()
}));

module.exports = Note;
