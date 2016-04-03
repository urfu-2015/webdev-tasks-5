function Todo() {
    this.todo = [];
    this.error_not_foind = {error: "todo not found"};
    this.message_delete = {message: "todo delete"};
    this.message_update = {message: "todo update"};
    this.message_update = {message: "todo update"};
}

Todo.prototype.length = function () {
    return this.todo.length;
};

Todo.prototype.addTodo = function (todo) {
    var new_todo = {
        todo: todo,
        dateCreate: Date.now(),
        dateUpdate: Date.now()
    };
    this.todo.append(new_todo);
    return new_todo;
};

Todo.prototype.updateTodo = function (index, newTodo) {
    if (index in this.todo) {
        var todo = this.todo[index];
        todo['todo'] = newTodo;
        todo['dateUpdate'] = Date.now();
        return todo;
    } else {
        return false;
    }
};

Todo.prototype.delTodo = function (index) {
    if (index in this.todo) {
        this.todo = this.todo.splice(index, 1);
        return true;
    } else {
        return false;
    }
};

Todo.prototype.getTodo = function (index) {
    return index in this.todo ? this.todo[index] : false;
};


Todo.prototype.getAllTodoReverse = function () {
    var allTodo = this.todo.slice();
    return allTodo.reverse();
};

module.exports = Todo;