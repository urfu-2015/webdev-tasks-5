'use strict';

var memoryStorage = [];

class Todo {
    constructor(props) {
        this.id = memoryStorage.length + 1;
        this.text = props.text;
    }

    save() {
        memoryStorage.push(this);
    }

    static getAll() {
        return memoryStorage;
    }

    static find(id) {
        return memoryStorage.filter(todo => {
            return todo.id === id;
        })[0];
    }

    static del(id) {
        memoryStorage = memoryStorage.filter(todo => {
            return todo.id !== id;
        });
    }

    static edit(id, newText) {
        memoryStorage[memoryStorage.indexOf(this.find(id))].text = newText;
    }
}

var tasks = ['code таск', 'push таск', 'Заслать PR', 'Выспаться', 'Катнуть ТВ'];

tasks.forEach((task, index) => {
    memoryStorage.push(
        new Todo(
            {
                id: index + 1,
                text: task
            }
        )
    );
});

module.exports = Todo;
