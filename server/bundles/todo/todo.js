import React from 'react';
import ReactDom from 'react-dom';

import Todo from '../../../client/bundles/todo/todo';

var rootEl = document.getElementById('root');

var update = ()=> {
    fetch('/api/v1/todo')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var todos = data;

            //React.initializeTouchEvents(true);

            function render() {
                ReactDom.render(
                    <Todo
                        todos={todos}
                    />,

                    rootEl
                );
            }

            window.render = render;

            render();
        });
};

window.update = update;
update();
