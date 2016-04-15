'use strict';

var tasks = [
    { id: 1, name: 'Купить котика' },
    { id: 2, name: 'Сходить на ДММ' },
    { id: 3, name: 'Навестить бабуленьку' },
    { id: 4, name: 'Сделать 5-ую задачу'}
];

class Task {
    constructor() {};

    static getAllTasks() {
        return tasks;
    };

    static addTask(text) {
        var id = tasks[tasks.length - 1].id + 1;
        tasks.push({
            id: id,
            name: text
        });
        return id;
    };

    static updateTask(id, text) {
        var index = Task.findIndex(id);
        if (index !== -1) {
            tasks[index].name = text;
            return true;
        } else {
            return false;
        }
    };

    static deleteTask(id) {
        var index = Task.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            return true;
        } else {
            return false;
        }
    };

    static findIndex(id) {
        return tasks.findIndex(function (elem) {
            return elem.id === id;
        });
    };
}

module.exports = Task;
