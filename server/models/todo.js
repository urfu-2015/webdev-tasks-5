'use strict';

var uuid = require('node-uuid');

var listTodo = [];

class Todo {
    constructor(text) {
        this.id = uuid.v4();
        this.text = text;
    }

    save() {
        listTodo.unshift(this);
    }

    delete() {
        var index = Todo.getIndexById(this.id);
        if (index !== null) {
            listTodo.splice(index, 1);
        }
    }

    static setTextById(id, text) {
        var todo = Todo.getTodoById(id);
        if (todo !== null) {
            todo.text = text;
        }
    }

    static getTextById(id) {
        var todo = Todo.getTodoById(id);
        return (todo === null) ? null : todo.text;
    }

    static getIndexById(id) {
        for (var i = 0; i < listTodo.length; ++i) {
            if (listTodo[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    static getTodoById(id) {
        var index = Todo.getIndexById(id);
        return (index === -1) ? null : listTodo[index];
    }

    static getAll() {
        return listTodo;
    }
}

new Todo('Todo #1').save();
new Todo('Todo #2').save();
new Todo('Todo #3').save();
new Todo('Todo #4').save();

module.exports = Todo;
