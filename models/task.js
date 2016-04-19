'use strict';

var memoryStorage = {};

class Task {
    constructor(props) {
        this.text = props.text;
    }

    save() {
        memoryStorage[this.text] = Date.now();
    }

    static findAll() {
        return Object.keys(memoryStorage).map(function (key) {
            return {text: key};
        });
    }

    static update(oldText, newText) {
        delete memoryStorage[oldText];
        memoryStorage[newText] = Date.now();
    }

    static deleteTask(text) {
        delete memoryStorage[text];
    }
}
new Task({
    text: 'To study'
}).save();

new Task({
    text: 'To sleep'
}).save();

new Task({
    text: 'To eat'
}).save();

module.exports = Task;
