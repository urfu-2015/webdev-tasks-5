'use strict';

const memoryStorage = [];

class Todo {
    constructor(text) {
        this.text = text;
        this.id = Todo.getId();
    }

    save() {
        memoryStorage.push(this);
    }

    static delete(id) {
        memoryStorage.forEach(function(item, index) {
            if (item.id === id) {
                memoryStorage.splice(index, 1);
            };
        });
        return memoryStorage;
    }

    static getAll() {
        return memoryStorage;
    }
    //guid.js
    static getId() {
        var newId;
        if (memoryStorage.length === 0) {
            newId = 0;
        } else {
            newId = memoryStorage[memoryStorage.length - 1].id;
        }
        return newId + 1;
    }
}

new Todo('Купить котика').save();
new Todo('Навестить бабуленьку').save();
new Todo('Сделать 5 задачу').save();
module.exports = Todo;
