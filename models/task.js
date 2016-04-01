'use strict';

var memoryStorage = [];
var idCounter = 0;

class Task {
    constructor(props) {
        this.text = props.text;
        this.createdAt = props.createdAt;
        this.editingMode = false;
    }

    save() {
        memoryStorage.push(Object.assign(this, {id: idCounter}));
        idCounter++;
    }

    static findAll() {
        return memoryStorage;
    }

    static update(text, newText) {
        for (var i = 0; i < memoryStorage.length; i++) {
            if (memoryStorage[i].text == text) {
                memoryStorage[i].text = newText;
                break;
            }
        }
    }

    static deleteTask(text) {
        for (var i = 0; i < memoryStorage.length; i++) {
            if (memoryStorage[i].text == text) {
                memoryStorage.splice(i, 1);
                break;
            }
        }
    }
}
new Task({
    text: 'To study'
}).save();

new Task({
    text: 'To sleep'
}).save();

new Task({
    text: 'To  eat'
}).save();

module.exports = Task;
