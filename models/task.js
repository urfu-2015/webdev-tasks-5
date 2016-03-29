'use strict';

var currentId = 0;
var storage = [];

class Task {
    constructor(text) {
        this.id = currentId;
        this.text = text;
    }

    save() {
        storage.push(this);
        currentId++;
    }

    static remove(id) {
        storage = storage.filter(task => {
            return task.id != id;
        })
    }

    static findAll() {
        return storage;
    }

    static edit(id, newText) {
    	storage[id].text = newText;
    }
}

require('../tasks.json').todoList.forEach(task => {
    var newTask = new Task(task.task).save();
});

module.exports = Task;