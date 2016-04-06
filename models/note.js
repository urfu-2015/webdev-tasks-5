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

    static find(text) {
        return memoryStorage.filter(note => note.text === text).pop();
    }

    static findAll() {
        return memoryStorage;
    }

    static remove(text) {
        memoryStorage.forEach((obj, i, memoryStorage) => {
            if (obj.text === text) {
                memoryStorage.splice(i);
            }
        });
    }

    static update(oldText, newText) {
        memoryStorage.forEach((obj, i, memoryStorage) => {
            if (obj.text === oldText) {
                console.log(obj.text);
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
