'use strict';

const memoryStorage = [];

class Note {
    constructor(props) {
        this.task = props.task;
        this.id = props.id || Math.round(-0.5 + Math.random() * 1000001);
    }

    save() {
        memoryStorage.push(this);
    }

    static delete(id) {
        let index = memoryStorage.indexOf(this.find(id));
        if (index !== -1) {
            memoryStorage.splice(index, 1);
        }
    }

    static edit(id, newText) {
        let index = memoryStorage.indexOf(this.find(Number(id)));
        if (index !== -1) {
            memoryStorage[index].task = newText;
        }
    }

    static find(id) {
        let note = memoryStorage.filter(note => note.id === id).pop();
        return note ? note : {};
    }

    static findAll() {
        return memoryStorage;
    }

}

const startTasks = ['Купить котика', 'Сходить на ДММ',
        'Навестить бабуленьку', 'Сделать 5ю задачу'];

startTasks.forEach((task, id) => {
    memoryStorage.push(new Note({
        task,
        id
    }));
});

module.exports = Note;
