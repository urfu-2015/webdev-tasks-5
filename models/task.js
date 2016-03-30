'use strict';

class Task {
    constructor(props) {
        this.id = guid();
        this.text = props.text;
    }

    save() {
        memoryStorage.push(this);
    };
    static changePosition(id, newNumber) {
        var oldNumber = getNumber(id);
        if (oldNumber === undefined) {
            return;
        }
        if (oldNumber > newNumber) {
            var min = oldNumber;
            var max = newNumber;
        } else {
            min = newNumber;
            max = oldNumber;
        }
        var curentTask = memoryStorage[oldNumber];
        memoryStorage.splice(oldNumber, 1);
        memoryStorage.splice(newNumber, 0 , curentTask);
    }
    static change(id, text) {
        var number = getNumber(id);
        memoryStorage[number].text = text;
    }

    static find(name) {
        return memoryStorage.filter(note => note.name === name).pop();
    }

    static findAll() {
        return memoryStorage;
    }
    static delete(id) {
        var number = getNumber(id);
        memoryStorage.splice(number, 1);
    }
}

const memoryStorage = [];

memoryStorage.push(
     new Task({
        text: 'Films to watch',
        length: memoryStorage.length
    })
);
// console.log(memoryStorage);
// console.log('---------------');
(new Task({text: 'twooooooooo!'})).save();
(new Task({text: 'threeeeeeee'})).save();
// console.log(memoryStorage);
// // console.log(memoryStorage[0]);
// Task.changePosition(memoryStorage[2].id, 0);
// console.log('---------------');
// console.log(memoryStorage);

function getNumber(id) {
    for (var i = 0; i < memoryStorage.length; i++) {
        if (memoryStorage[i].id === id) {
            return i;
        }
    }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

module.exports = Task; 
