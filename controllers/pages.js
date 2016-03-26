
exports.index = (req, res) => {
    res.render('index.html');
};

exports.error404 = (req, res) => res.sendStatus(404);
