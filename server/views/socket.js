var todos = [
    'Сходить на ДММ',
    'Купить котика',
    'Навестить бабулю',
    'Сделать 5ую задачу'
];
module.exports = function (socket) {
    // send the new user their name and a list of users

    socket.emit('init todos', {todos});

    socket.on('init app', function(data) {
        socket.emit('init todos', {
            todos: todos
        });
    });

    socket.on('add todo', function(todo){
        todos.unshift(todo);
        console.log(todo + " добавлено");
    });

    socket.on('delete todo', function(todo){
        todos.splice(todo, 1);
    });

    socket.on('change todo', function(data) {
        todos[data.old] = data.new;
    });
};