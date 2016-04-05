'use strict';

const storage = [];

class Task {
    constructor(props) {
        this.text = props.text;
        this.order = storage.length;
        this.id = storage.length;
    }

    static getStorage() {
        return storage;
    }

    save() {
        storage.push(this);
    }

    static removeTask(taskId) {
        var id = taskId.replace(/\D/g, "");
        delete storage[id];
    }

    static changeTask(taskId, changedText) {
        var id = taskId.replace(/\D/g, "");
        storage[id].text = changedText;
        return storage[id];
    }

    static find(id) {
        return storage.filter(task => task.id === id);
    }

}

new Task({text: 'Сделать пятое задание'}).save();
new Task({text: 'Погладить котиков'}).save();
new Task({text: 'Выпить чаю'}).save();
new Task({text: 'Лечь спать'}).save();
new Task({text: 'Проснуться вовремя'}).save();

module.exports = Task;
