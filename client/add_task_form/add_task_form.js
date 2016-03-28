import React from 'react';
import {store} from '../../server/views/main/scripts.js';
import {actions} from '../actions.js';
import {userInterface} from '../interface.js';

const AddTaskForm = React.createClass({
    render: function() {
        const add = '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C';

        return (
            <form className="add-task-form">
                <input type="text" className="add-task-form__text" data-displayed={false} />
                <input type="button" className="add-task-form__submit" value={add} onClick={this.addTask} />
            </form>
        )
    },
    addTask: function(event) {
        var element = event.target;
        var input = document.getElementsByClassName('add-task-form__text')[0];

        if (input.dataset.displayed === 'false') {
            userInterface.showElement(input);
            return;
        }
        var text = input.value;

        if (text === '') {
            return;
        }
        var req = new XMLHttpRequest();

        req.open('POST', '/', true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(`text=${text}`);
        req.onreadystatechange = function () {
            if (req.status === 200 && req.readyState === 4) {
                userInterface.hideElement(document.getElementsByClassName('add-task-form__text')[0]);
                var task = JSON.parse(req.responseText);

                store.dispatch(actions.addTask(task));
            }
        };
    }
});

export default () => {
    return React.createElement(AddTaskForm);
}