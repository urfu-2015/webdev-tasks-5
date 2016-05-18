'use strict';

var memoryStorage = [];

class Todo {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    save() {
        memoryStorage.push(this);
    }

    static updateById(todoId, newTodo) {
        var todoStorageIndex = memoryStorage.findIndex(todo => todo.id === todoId);
        if (todoStorageIndex < 0) {
            return false;
        }
        memoryStorage[todoStorageIndex] = newTodo;
        return true;
    }

    static findAll() {
        return memoryStorage;
    }

    static deleteById(todoId) {
        var todosCountBefore = memoryStorage.length;
        memoryStorage = memoryStorage.filter(todo => todo.id !== todoId);
        return todosCountBefore > memoryStorage.length;
    }
}

memoryStorage.push(
    new Todo(0, "lalala"));

memoryStorage.push(
    new Todo(1, "AHAHAH"));

module.exports = Todo;
