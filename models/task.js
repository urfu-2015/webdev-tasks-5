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
        storage.push(this);
        currentId++;
    }

    static remove(id) {
        var isDeleted = checkId(id) ? removeById(id) : false;
        var res = isDeleted ? 'ok' : 'bad id';
        return res;
    }   

    static findAll() {
        return storage.filter(task => {
            return !task.isRemoved;
        });
    }

    static edit(id, newText) {
        if (newText.length == 0)
            return 'empty task';
        if (checkId(id) && id <= currentId) {
            storage[id].text = newText;
            return 'ok';
        } else {
            return 'bad id';
        }
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