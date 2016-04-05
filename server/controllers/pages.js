'use strict';

exports.index = (req, res) => {
    res.render('index/index', Object.assign(data, req.commonData));
};
exports.error404 = (req, res) => res.sendStatus(404);
