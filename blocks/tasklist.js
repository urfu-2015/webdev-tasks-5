import React from 'react';
const sendRequest = require('../public/scripts/xml-http.js').sendRequest;

var taskList = null;
var taskAdditionField = null;

var Task = React.createClass({
    getInitialState: function () {
        return {
            tapped: false,
            swiped: false,
            shifted: false,
            text: this.props.task.text
        };
    },
    render: function () {
        var button = null;
        var textFieldClass = "task__text task__text_shiftable";

        if (this.state.tapped || this.state.swiped) {
            textFieldClass += ' task__text_shifted';
            var buttonClassName = "task__btn";
            this.state.shifted ?
                buttonClassName += " task__btn_shown":
                null;
            var imageSrc = null;
            this.state.tapped ? imageSrc = "images/ok.png" : null;
            this.state.swiped ? imageSrc = "images/delete.png" : null;
            button =
                <div className={buttonClassName}>
                    <img className="task__btn-image" src={imageSrc} />
                </div>;
            if (!this.state.shifted) {
                setTimeout(function (){
                    this.setState({shifted: true});
                }.bind(this), 300);
            }
        }

        var textField =
            <textarea
                className = {textFieldClass}
                readOnly
                value = {this.state.text}
            />;

        if (this.state.shifted) {
            var changeHandler = function(evt) {
                this.setState({text: evt.target.value});
            }.bind(this);
            textField =
                <textarea
                    className = {textFieldClass}
                    autoFocus
                    value = {this.state.text}
                    onChange = {changeHandler}
                />;
        }

        return (
            <div
                className = "task"
                onTouchStart = {this.handleTouchStart}
                onTouchEnd = {this.handleTouchEnd}
                onTouchMove = {this.handleTouchMove}
            >
                {textField}
                {button}
            </div>
        );
    },
    handleTouchStart: function (evt) {
        if (
            evt.target.classList.contains('task__btn-image') &&
            this.state.tapped
        ) {
            if (
                this.props.name ||
                this.props.name === 0
            ) {
                var method = 'PATCH';
                var path = '/tasks/' + this.props.name;
            } else {
                var method = 'POST';
                var path = '/tasks';
            }
            var newTaskText = this.state.text;
            var cb = function (xhr) {
                this.props.task.text = newTaskText;
                this.setState(this.getInitialState());
                if (method === 'POST') {
                    taskList.props.tasks.unshift({
                        id: JSON.parse(xhr.responseText).id,
                        text: newTaskText
                    });
                    taskAdditionField = null;
                    setTimeout(function() {
                        taskList.forceUpdate();
                    }, 300);
                }
            }.bind(this);
            sendRequest({text: this.state.text}, {method, path}, cb);
            return;
        }
        if (
            evt.target.classList.contains('task__btn-image') &&
            this.state.swiped
        ) {
            var cb = function (xhr) {
                for (var i = 0; i < taskList.props.tasks.length; i++) {
                    var task = taskList.props.tasks[i];
                    if (task.id === this.props.name) {
                        taskList.props.tasks.splice(i, 1);
                        taskList.forceUpdate();
                        break;
                    }
                }
            }.bind(this);
            sendRequest(null, {
                method: 'DELETE',
                path: '/tasks/' + this.props.name
            }, cb);
            return;
        }
        this.prevEvent = evt.nativeEvent;
    },
    handleTouchEnd: function (evt) {
        if (this.prevEvent.type === 'touchstart') {
            this.setState({tapped: true});
            document.addEventListener('touchstart', this.handleTouchLeave);
        }
        this.prevEvent = evt.nativeEvent;
    },
    handleTouchMove: function (evt) {
        if (this.prevEvent.type === 'touchmove') {
            var currTouch = evt.touches[0];
            var prevTouch = this.prevEvent.touches[0];
            var diffX = prevTouch.pageX - currTouch.pageX;
            var diffY = currTouch.pageY - prevTouch.pageY;
            var touchesDiff = Math.sqrt(diffX * diffX + diffY * diffY);
            var sine = Math.abs(diffX) / touchesDiff;
            if (sine === 1) {
                this.setState({swiped: true});
                document.addEventListener('touchstart', this.handleTouchLeave);
            }
        }
        this.prevEvent = evt.nativeEvent;
    },
    handleTouchLeave: function (evt) {
        if (
            this.prevEvent.target.parentNode !== evt.target.parentNode ||
            !evt.target.classList.contains('task__text')
        ) {
            this.setState(this.getInitialState());
            document.removeEventListener('touchstart', this.handleTouchLeave);
        }
    }
});

var TaskAdditionButton = React.createClass({
    render: function () {
        return (
            <div
                className="addition-btn"
                onTouchStart = {this.handleTouchStart}
                onTouchEnd = {this.handleTouchEnd}
            >
                Добавить
            </div>
        );
    },
    handleTouchStart: function(evt) {
        this.prevEvent = evt.nativeEvent;
    },
    handleTouchEnd: function(evt) {
        if (this.prevEvent.type === 'touchstart') {
            taskAdditionField = <Task task = {{text: ''}} name = '' />;
            taskList.forceUpdate();
        }
        this.prevEvent = evt.nativeEvent;
    }
});

var TaskList = React.createClass({
    getInitialState: function () {
        taskList = this;
        return null;
    },
    render: function () {
        return (
            <div class="task-list">
                {taskAdditionField}
                {
                    this.props.tasks.map(task => (
                        <Task task = {task} key = {task.id+task.text} name = {task.id} />
                    ))
                }
                <TaskAdditionButton />
            </div>
        );
    }
});

export default TaskList;
