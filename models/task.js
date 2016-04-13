'use strict';

var currentId = 0;
var storage = [];

class Task {
    constructor(text) {
        this.id = currentId;
        this.text = text;
        this.isRemoved = false;
    }

    save() {
        if (this.text.length) {
            storage.push(this);
            currentId++;
            return true;
        }
        return false;
    }

    static remove(id) {
        var isDeleted = checkId(id) ? removeById(id) : false;
        return isDeleted;
    }   

    static findAll() {
        return storage.filter(task => {
            return !task.isRemoved;
        });
    }

    static edit(id, newText) {
        if (checkId(id) && newText.length) {
            storage[id].text = newText;
            return true;
        }
        return false;
    }
}

function checkId(id) {
    return storage.some(task => {
        return task.id == id;
    });
}

function removeById(id) {
    storage = storage.filter(task => {
        if (task.id == id) {
            task.isRemoved = true;
        }
        return true;
    });
    return true;
}

require('../tasks.json').todoList.forEach(task => {
    var newTask = new Task(task.text).save();
});

module.exports = Task;