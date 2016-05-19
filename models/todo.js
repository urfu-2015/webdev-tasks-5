'use strict';

let todoList = [];
let inc = 0;

class Todo {
    constructor(text) {
        this.num = inc++;
        this.todo = text;
    }

    save() {
        todoList.push(this);
    }

    static changeTodo(num, newText) {
        const index = this.findIndex(num);

        if (index > -1) {
            todoList[index].todo = newText;
        }
    }

    static deleteTodo(num) {
        const index = this.findIndex(num);

        if (index > -1) {
            todoList.splice(index, 1);
        }
    }

    static findIndex(num) {
        let result;

        num = Number(num);
        todoList.some(function (item, i) {
            if (item.num === num) {
                result = i;
                return true;
            }
        });

        return result;
    }

    static findAll() {
        return todoList;
    }
}

// todoList.push(new Todo('сделать всю домашку'));
// todoList.push(new Todo('купить слона!'));

module.exports = Todo;
