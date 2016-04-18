'use strict';

var todoList = [];

class Todo {
    constructor(text) {
        this.todo = text;
    }

    save() {
        todoList.push(this);
    }

    static findAll() {
        return todoList;
    }
}

todoList.push(new Todo('сделать всю домашку'));
todoList.push(new Todo('купить слона!'));

module.exports = Todo;
