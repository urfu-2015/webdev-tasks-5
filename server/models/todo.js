'use strict';

var listTodo = [];

class Todo {
    constructor(text, id) {
        this.id = (id === undefined) ? 0 : id;
        this.text = text;
    }

    save() {
        listTodo = listTodo.map(function (item) {
            ++item.id;
            return item;
        });
        listTodo.unshift(this);
    }

    delete() {
        listTodo = listTodo.map(function (item) {
            if (item.id > this.id) {
                --item.id;
            }
            return item;
        }.bind(this));
        listTodo.splice(this.id, 1);
    }

    static setTextById(id, text) {
        Todo.getById(id).text = text;
    }

    static getTextById(id) {
        return Todo.getById(id).text;
    }

    static getById(id) {
        return listTodo[id];
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
