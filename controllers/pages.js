'use strict';

exports.main = (req, res) => {
    res.render('main.html');
};

exports.error404 = (req, res) => res.sendStatus(404);