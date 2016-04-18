import React from 'react';
const sendRequest = require('../public/scripts/xml-http.js').sendRequest;

var TaskList = React.createClass({
    getInitialState: function () {
        return {
            tappedTask: null,
            swipedTask: null,
            addingTask: false,
            editingTask: false
        };
    },
    render: function () {
        return (
            <div class="task-list">
                <TaskAdditionField taskList = {this} />
                {
                    this.props.tasks.map(task => (
                        <Task taskList = {this} task = {task} key = {task.id+task.text} />
                    ))
                }
                <TaskAdditionButton />
            </div>
        );
    }
});

var Task = React.createClass({
    getInitialState: function () {
        return {
            shifted: false,
            text: this.props.task.text
        };
    },
    render: function () {
        var isTapped = this.props.taskList.state.tappedTask === this.props.task.id.toString();
        var isSwiped = this.props.taskList.state.swipedTask === this.props.task.id.toString();
        var button = null;
        var taskClassName = "task task_num_" + this.props.task.id;
        var textFieldClassName = "task__text task__text_shiftable task_num_" + this.props.task.id;

        if (isTapped || isSwiped) {
            textFieldClassName += ' task__text_shifted';
            var buttonClassName = "task__btn task_num_" + this.props.task.id;
            var imageClassName = "task__btn-image task_num_" + this.props.task.id;
            this.props.taskList.state.editingTask ?
                buttonClassName += " task__btn_shown":
                null;
            var imageSrc = null;
            isTapped ? imageSrc = "images/ok.png" : null;
            isSwiped ? imageSrc = "images/delete.png" : null;
            button =
                <div className={buttonClassName}>
                    <img className={imageClassName} src={imageSrc} />
                </div>;
        }

        if (!this.props.taskList.state.editingTask) {
            var textField =
                <textarea
                    className = {textFieldClassName}
                    readOnly
                    value = {this.state.text}
                />;
        } else {
            var changeHandler = function(evt) {
                this.setState({text: evt.target.value});
            }.bind(this);
            var textField =
                <textarea
                    className = {textFieldClassName}
                    autoFocus
                    value = {this.state.text}
                    onChange = {changeHandler}
                />;
        }

        return (
            <div
                className = {taskClassName}
                name = {this.props.task.id}
            >
                {textField}
                {button}
            </div>
        );
    }
});

var TaskAdditionField = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function() {
        if (this.props.taskList.state.addingTask) {
            return (
                <Task taskList = {this.props.taskList} task = {{id: '-1', text: ''}} />
            );
        } else {
            return null;
        }
    }
});

var TaskAdditionButton = React.createClass({
    render: function () {
        return (
            <div
                className='addition-btn'
            >
                Добавить
            </div>
        );
    }
});

export default TaskList;
