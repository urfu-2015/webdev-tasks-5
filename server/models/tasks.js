'use strict';

const Task = require('./task.js');
const loader = require('../../tasks_loader.js');

class Tasks {
    constructor(tasks) {
        this.tasksList = [];
        this.length = 0;
        if (tasks) {
            tasks.list.forEach((item) => {
                this.tasksList.push(new Task(this.length, item));
                this.length++;
            });
        }
    }

    add(strTask) {
        this.tasksList.push(new Task(this.length, strTask));
        this.length++;
        return this.length - 1;
    }

    getTasks() {
        return this.tasksList;
    }

    removeTask(id) {
        let index;

        this.tasksList.find((item, currentIndex) => {
            if (item.id == id) {
                index = currentIndex;
                return true;
            }
        });
        if (typeof index !== 'undefined') {
            this.tasksList.splice(index, 1);
            return true;
        }
        return false;
    }

    renameTask(id, text) {
        let index;

        this.tasksList.find((item, ind, array) => {
            if (item.id == id) {
                index = ind;
                return true;
            }
        });
        if (typeof index !== 'undefined') {
            this.tasksList[index].text = text;
            return true;
        }
        return false;
    }
}

module.exports = new Tasks(loader.tasks);
