var todos = [
    'Сходить на ДММ',
    'Купить котика',
    'Навестить бабулю',
    'Сделать 5ую задачу'
];
var responseMessage = 'ok';
exports.index = (req, res) => {
    res.render('index.html');
};
exports.listTodo = (req, res) => {
    res.send(todos);
};
exports.listDelete = (req, res) => {
    todos.splice(parseInt(req.body.name), 1);
    res.send(responseMessage);
};
exports.listAdd = (req, res) => {
    todos.unshift(req.body.content);
    res.send(responseMessage);
};

exports.listChange = (req, res) => {
    todos[parseInt(req.body.id)] = req.body.content;
    res.send(responseMessage);
};

exports.error404 = (req, res) => res.sendStatus(404);
