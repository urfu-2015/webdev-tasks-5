class Todo {
    constructor() {
        this.todo = [];
        this.message_delete = {message: "todo delete"};
        this.error_not_found = {error: "todo not found"};
        this.error_not_found_field = {error: "not found field todo"};
    }

    length() {
        return this.todo.length;
    };

    addTodo(todo) {
        var s = [];
        var new_todo = {
            id: this.todo.length,
            todo: todo,
            dateCreate: Date.now(),
            dateUpdate: Date.now()
        };
        this.todo.push(new_todo);
        return new_todo;
    };

    updateTodo(index, newTodo) {
        if (this._checkIdTodo(index)) {
            var todo = this.todo[index];
            todo['todo'] = newTodo;
            todo['dateUpdate'] = Date.now();
            return todo;
        }
        return false;
    };

    delTodo(index) {
        if (this._checkIdTodo(index)) {
            this.todo.splice(index, 1);
            return true;
        }
        return false;
    };

    getTodo(index) {
        console.log(index);
        return this._checkIdTodo(index) ? this.todo[index] : false;
    };

    getAllTodoReverse() {
        var allTodo = this.todo.slice();
        return allTodo.reverse();
    };

    _checkIdTodo(index) {
        var keysTodo = Object.keys(this.todo);
        return keysTodo.includes(index);
    };
}


module.exports = Todo;