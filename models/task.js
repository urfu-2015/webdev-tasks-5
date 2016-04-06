'use strict';

var tasks = [
    { name: 'Купить котика' },
    { name: 'Сходить на ДММ' },
    { name: 'Навестить бабуленьку' },
    { name: 'Сделать 5-ую задачу'}
];

class Task {
    constructor() {};

    static getAllTasks() {
        return tasks;
    };

    static addTask(text) {
        tasks.push({
            name: text
        });
    };

    static updateTask(index, newText) {
        tasks[index].name = newText;
    };

    static deleteTask(index) {
        tasks.splice(index, 1);
    };

    static sortingTasks(data) {
        tasks = data.slice();
    };
}

module.exports = Task;
