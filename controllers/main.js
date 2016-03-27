
module.exports.getIndex = function(req, res, next) {
    res.render('index', { title: 'TODo-хИ',
        stylesheets: [
            {filename: 'layout'},
            {filename: 'index'}
        ]
    });
};