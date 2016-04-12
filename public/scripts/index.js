'use strict';

function changeTask(id, newText, cb) {
    XHR.putJSON('/api/task/' + id, { text: newText }, function (code, res) {
        if (code == 200 && cb) {
            cb();
        }
    });
}

function deleteTask(id, cb) {
    XHR.deleteJSON('/api/task/' + id, cb);
}

function addTask() {
    var text = document.getElementsByClassName('add-item-area')[0].value;
    XHR.postJSON('/api/task', { text: text }, function (code, res) {
        createTaskOnFront(res.task);
    });
}

function createTaskOnFront(task) {
    addTaskCB(task);
}

function showLoading() {
    document.getElementsByClassName('loading-image')[0].style.display = 'inline';
}

function hideLoading() {
    document.getElementsByClassName('loading-image')[0].style.display = 'none';
}

function getNewTasks() {
    showLoading();
    XHR.getJSON('/api/task', function (code, tasks) {
        hideLoading();
        clearTasksCB();
        tasks.forEach(createTaskOnFront);
    });
}

function getTasks() {
    hideLoading();
    XHR.getJSON('/api/task', function (code, tasks) {
        tasks.forEach(createTaskOnFront);
    });
}

var TaskItem = React.createClass({
    displayName: 'TaskItem',

    getInitialState: function () {
        var taphandler = new TapHandler();
        taphandler.swipeLeftCB = this.onSwipeLeft;
        taphandler.swipeRightCB = this.onSwipeRight;
        return {
            taphandler: taphandler,
            edit: false,
            isDelete: false,
            id: this.props.id,
            text: this.props.text
        };
    },

    changeText: function (event) {
        this.setState({ text: event.target.value });
    },

    updateTask: function (event) {
        changeTask(this.state.id, this.state.text);
    },

    onSwipeLeft: function () {
        this.setState({ isDelete: true });
    },

    onSwipeRight: function () {
        this.setState({ isDelete: false });
    },

    onClick: function () {
        this.setState({ edit: !this.state.edit });
    },

    onTextAreaClick: function (event) {
        event.stopPropagation();
    },

    onDeleteTask: function (event) {
        event.stopPropagation();
        deleteTask(this.state.id, function () {
            this.props.deleteCB();
        }.bind(this));
    },

    render: function () {
        var innerContent;
        if (this.state.edit) {
            innerContent = React.createElement(
                'div',
                { className: 'task-item__editor' },
                React.createElement('textarea', {
                    className: 'task-item__editor__area',
                    value: this.state.text,
                    onChange: this.changeText,
                    onClick: this.onTextAreaClick }),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    {
                        onClick: this.updateTask,
                        className: 'task-item__save-button' },
                    'Сохранить'
                )
            );
        } else {
            innerContent = React.createElement(
                'div',
                { className: 'task-item__name' },
                this.state.text
            );
        }
        var className = "task-item task-item_edit_false task-item_delete_" + this.state.isDelete.toString();
        return React.createElement(
            'div',
            { className: className,
                onTouchStart: this.state.taphandler.touchStart.bind(this.state.taphandler),
                onTouchMove: this.state.taphandler.touchMove.bind(this.state.taphandler),
                onTouchEnd: this.state.taphandler.touchEnd.bind(this.state.taphandler),
                onClick: this.onClick
            },
            innerContent,
            React.createElement(
                'div',
                { className: 'task-item__delete-task' },
                React.createElement('img', {
                    src: '/images/delete.png',
                    width: '30',
                    height: '30',
                    onClick: this.onDeleteTask
                })
            )
        );
    }

});

var TaskList = React.createClass({
    displayName: 'TaskList',


    getInitialState: function () {
        return { tasks: [] };
    },

    componentDidMount: function () {
        addTaskCB = this.addTask;
        clearTasksCB = this.clearTasks;
        setTimeout(completelyLoaded(), 0);
    },

    addTask: function (task) {
        this.setState({ tasks: this.state.tasks.concat(task) });
    },

    clearTasks: function () {
        this.setState({ tasks: [] });
    },

    getDeleteCB: function (id) {
        return function () {
            var newTasks = this.state.tasks.filter(function (task) {
                return task.id != id;
            });
            this.setState({ tasks: newTasks });
        }.bind(this);
    },

    render: function () {
        var items = [];
        this.state.tasks.forEach(function (task) {
            items.push(React.createElement(TaskItem, {
                key: task.id,
                id: task.id,
                text: task.text,
                deleteCB: this.getDeleteCB(task.id)
            }));
        }.bind(this));
        return React.createElement(
            'div',
            null,
            items
        );
    }
});

var addTaskCB;
var clearTasksCB;

function completelyLoaded() {
    document.getElementsByClassName('task-item__add-button')[0].addEventListener('click', addTask);
    var updateHandler = new TapHandler(document.getElementsByClassName('task-list')[0]);
    updateHandler.swipeDownCB = getNewTasks;
}

window.addEventListener('load', function () {
    var tasklist = React.createElement(TaskList, null);
    ReactDOM.render(tasklist, document.getElementsByClassName('task-list__append-zone')[0]);
});

window.addEventListener('load', getTasks);