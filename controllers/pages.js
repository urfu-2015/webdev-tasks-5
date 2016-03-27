var todos = [
    'Сходить на ДММ',
    'Купить котика',
    'Навестить бабулю',
    'Сделать 5ую задачу'
];
exports.index = (req, res) => {
    res.render('index.html');
};
exports.listTodo = (req, res) => {
    res.send(todos);
};
exports.listDelete = (req, res) => {
    todos.splice(parseInt(req.body.name), 1);
    console.log(todos);
    res.send(todos);
};
exports.listAdd = (req, res) => {
    //todos.push(req.body.content);
    todos.unshift(req.body.content);
    console.log(todos);
    res.send(todos);
};

exports.listChange = (req, res) => {
    todos[parseInt(req.body.id)] = req.body.content;
    console.log(req.body);
    res.send(todos);
};

exports.error404 = (req, res) => res.sendStatus(404);
