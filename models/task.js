'use strict';

const transliter = require('transliteration');
let tasks = [];

class Task {
    constructor(text, position) {
        this.id = Task.createId(text);
        this.text = text;
        this.position = position;
    }

    save() {
        tasks = tasks.map(task => {
            if (task.position >= this.position) {
                ++task.position;
            }
            return task;
        });
        tasks.push(this);
    }

    static find(id) {
        return tasks.find(task => task.id === id);
    }

    static findAll() {
        return tasks;
    }

    static getTasksCount() {
        return tasks.length;
    }

    static removeTask(id) {
        const removedTask = this.find(id);
        if (!removedTask) {
            return;
        }
        tasks = tasks
            .filter(task => task.id !== id)
            .map(task => {
                if (task.position > removedTask.position) {
                    --task.position;
                }
                return task;
            });
        return true;
    }

    static createId(text) {
        let id = transliter(text.replace(/ +/, '_').substr(0, 10));
        while (Task.find(id)) {
            id = id.substr(0, 10) + (parseInt(id.substr(10), 10) + 1);
        }
        return id;
    }
}

new Task('Купить котика', 0).save();
new Task('Сходить на дмм', 1).save();
new Task('Навестить бабуленьку', 2).save();
new Task('Сделать пятую задачу', 3).save();

module.exports = Task;
