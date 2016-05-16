exports.index = (req, res) => {
    res.render('./todos/todos', req.commonData);
};

exports.error404 = (req, res) => res.sendStatus(404);
