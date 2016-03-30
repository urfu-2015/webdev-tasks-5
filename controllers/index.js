var listTodo = [
    'TODO #1',
    'TODO #2',
    'TODO #3',
    'TODO #4'
];

exports.index = function (req, res) {
    res.render('index', { title: 'TODO-хи' });
};

exports.getList = function (req, res) {
    res.send({
        status: 'OK. List TODO.',
        content: listTodo
    });
};

exports.itemAdd = function (req, res) {
    listTodo.unshift(req.body.content);
    res.send({
        status: 'OK. Item added.'
    });
};

exports.itemDelete = function (req, res) {
    listTodo.splice(parseInt(req.body.id), 1);
    res.send({
        status: 'OK. Item deleted.'
    });
};

exports.itemChange = function (req, res) {
    listTodo[parseInt(req.body.id)] = req.body.content;
    res.send({
        status: 'OK. Item changed.'
    });
};
