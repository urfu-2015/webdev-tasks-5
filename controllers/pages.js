exports.index = (req, res) => {
    res.render('index');
};

exports.error404 = (req, res) => res.sendStatus(404);
