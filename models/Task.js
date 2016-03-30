'use strict';

const storage = [];

class Task {
    constructor(props) {
        this.text = props.text;
        this.order = storage.length;
        this.id = props.order || storage.length;
    }

    static getStorage() {
        return storage;
    }

    save() {
        storage.push(this);
    }

    static removeTask(id) {

    }

    static changeTask(id) {

    }

    static find(id) {
        return storage.filter(task => task.id === id);
    }

}

storage.push(new Task({text: 'Сделать пятое задание'}));


storage.push(new Task(
    {
        text: 'Погладить котиков'
    }
));


storage.push(new Task(
    {
        text: 'Выпить чаю'
    }
));


storage.push(new Task(
    {
        text: 'Лечь спать'
    }
));


storage.push(new Task(
    {
        text: 'Проснуться вовремя'
    }
));

module.exports = Task;
