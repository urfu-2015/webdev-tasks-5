'use strict';

exports.index = (req, res) => {
    res.render('index.hbs', {});
};

exports.error404 = (req, res) => res.sendStatus(404);
