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
            <div class='task-list'>
                <TaskAdditionField
                    isTapped = {this.state.tappedTask === '-1'}
                    isSwiped = {this.state.swipedTask === '-1'}
                    addingTask = {this.state.addingTask}
                    editingTask = {this.state.editingTask}
                />
                {
                    this.props.tasks.map(task => (
                        <Task
                            isTapped = {this.state.tappedTask === task.id.toString()}
                            isSwiped = {this.state.swipedTask === task.id.toString()}
                            editingTask = {this.state.editingTask}
                            task = {task}
                            key = {task.id + task.text}
                        />
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
        var button = null;
        var taskClassName = 'task task_num_' + this.props.task.id;
        var textFieldClassName = 'task__text task__text_shiftable task_num_' + this.props.task.id;

        if (this.props.isTapped || this.props.isSwiped) {
            textFieldClassName += ' task__text_shifted';
            var buttonClassName = 'task__btn task_num_' + this.props.task.id;
            var imageClassName = 'task__btn-image task_num_' + this.props.task.id;
            this.props.editingTask ?
                buttonClassName += ' task__btn_shown' :
                null;
            var imageSrc = null;
            imageSrc = this.props.isTapped ? 'images/ok.png' : 'images/delete.png';
            button =
                <div className = {buttonClassName}>
                    <img className = {imageClassName} src = {imageSrc} />
                </div>;
        }

        if (
            this.props.isTapped &&
            this.props.editingTask
        ) {
            var changeHandler = function (evt) {
                this.setState({text: evt.target.value});
            }.bind(this);
            var textField =
                <textarea
                    className = {textFieldClassName}
                    autoFocus
                    value = {this.state.text}
                    onChange = {changeHandler}
                />;
        } else {
            var textField =
                <textarea
                    className = {textFieldClassName}
                    readOnly
                    value = {this.state.text}
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
    getInitialState: function () {
        return null;
    },
    render: function () {
        if (this.props.addingTask) {
            return (
                <Task
                    isTapped = {this.props.isTapped}
                    isSwiped = {this.props.isSwiped}
                    editingTask = {this.props.editingTask}
                    task = {{id: '-1', text: ''}}
                />
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
