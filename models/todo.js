'use strict';

const todosStorage = [];

class Todo {
    constructor(props) {
        this.text = props.text;
        this.order = props.order;
        this.createdAt = (new Date()).getTime();
    }

    save() {
        this._id = todosStorage.length;
        todosStorage.push(this);
    }

    delete() {
        todosStorage[_id] = undefined;
    }

    static findById(id) {
        return todosStorage[id];
    }

    static findAll() {
        return todosStorage;
    }
}

(new Todo({
    text: 'To do'
})).save();

(new Todo({
    text: 'To do'
})).save();

(new Todo({
    text: 'To do, to do, to do, to'
})).save();

(new Todo({
    text: 'To doooo, dododododo'
})).save();

module.exports = Todo;