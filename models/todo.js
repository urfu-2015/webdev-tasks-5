'use strict';

const memoryStorage = [];

class Todo {
    constructor(props) {
        this.id = memoryStorage.length + 1;
        this.text = props.text;
    }

    save() {
        memoryStorage.push(this);
    }

    static getAll() {
        // Сделаем копию, чтобы спокойно реверснуть
        return JSON.parse(JSON.stringify(memoryStorage)).reverse();
    }

    static find(id) {
        /* eslint eqeqeq: 0 */
        return memoryStorage.filter(todo => {
            return todo.id == id;
        })[0];
    }

    static del(id) {
        var delObj = this.find(id);
        var ind = memoryStorage.indexOf(delObj);
        memoryStorage.splice(ind, 1);
    }

    static edit(id, newText) {
        var editObj = this.find(id);
        var ind = memoryStorage.indexOf(editObj);
        memoryStorage[ind].text = newText;
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
