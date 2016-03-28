import React from 'react';
import {store} from '../../server/views/main/scripts.js';
import {actions} from '../actions.js';
import {userInterface} from '../interface.js';

const Task = React.createClass({
    render: function() {
        const save = "\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c";

        return (
            <div className="task" data-id={this.props.id} key={this.props.id}>
                <div className="task__text" data-id={this.props.id} onClick={userInterface.showForm}>{this.props.text}</div>
                <div className="task__delete" data-id={this.props.id} onClick={this.removeTask}></div>
                <form className="task__rename" data-id={this.props.id}>
                    <input type="text" className="rename-text" data-id={this.props.id}/>
                    <input type="button" className="rename-submit" data-id={this.props.id} value={save} onClick={this.renameTask}/>
                </form>
            </div>
        );
    },
    removeTask: function(event) {
        var element = event.target;
        var req = new XMLHttpRequest();
        var id = this.props.id;

        req.open('DELETE', '/', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify({id}));
        req.onreadystatechange = function () {
            if (req.status === 200 && req.readyState === 4) {
                store.dispatch(actions.deleteTask(id));
            }
        };
    },
    renameTask: function(event) {
        var element = event.target;
        var id = this.props.id;

        if (element.previousElementSibling.value === '') {
            return;
        }
        var text = encodeURIComponent(element.previousElementSibling.value);
        var req = new XMLHttpRequest();

        req.open('PUT', '/', true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(`text=${text}&id=${id}`);
        req.onreadystatechange = function () {
            if (req.status === 200 && req.readyState === 4) {
                text = JSON.parse(req.responseText).text;
                store.dispatch(actions.renameTask(id, text));
                userInterface.closeForms();
            }
        };
    }
});


export default ({store}) => {
    const res = [];

    store.getState().forEach((item) => {
        res.push(
            React.createElement(Task, {key: item.id, id: item.id, text: item.text})
        );
    });
    return <div className="tasks-list">{res}</div>;
};
