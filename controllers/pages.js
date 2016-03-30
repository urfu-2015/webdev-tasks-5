'use strict';

module.exports.index = (req, res) => {
    const data = {
        headerText: 'TODO-хи'
    };
    res.render('index/index', Object.assign(data, req.commonData))
};

module.exports.error404 = (req, res) => {
    res.sendStatus(404);
}