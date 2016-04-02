exports.index = (req, res) => {
    res.render('page', {
        bemjson: {
            block: 'page',
            title: 'Todo',
            head: [
                { elem: 'css', url: '_page.css' },
                { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1.0, user-scalable=yes' } }
            ],
            scripts: [
                { elem: 'js', url: '_page.js' },
                { elem: 'js', url: 'fetch.js' },
                { elem: 'js', url: 'es6-promise.min.js' },
                { elem: 'js', url: 'promise.min.js' },
                { elem: 'js', url: 'https://js.cx/babel-core/browser.min.js' },
            ],
            content: [
                {
                    block: 'todo-app'
                }
            ]
        }
    });
};

exports.error404 = (req, res) => res.sendStatus(404);