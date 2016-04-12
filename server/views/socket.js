var todos = [
    'Сходить на ДММ',
    'Купить котика',
    'Навестить бабулю',
    'Сделать 5ую задачу'
];
module.exports = function (socket) {

    socket.emit('init todos', {todos});

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