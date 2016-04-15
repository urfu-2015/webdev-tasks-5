exports.index = (req, res) => {
    res.render('main/main', {});
};

exports.error404 = (req, res) => {
    res.sendStatus(404);
};
