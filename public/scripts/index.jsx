'use strict';

function changeTask(id, newText, cb) {
    XHR.putJSON('/api/task/' + id, { text: newText }, function (code, res) {
        if (code == 200 && cb) {
            cb();
        }
    });
}

function deleteTask(cb) {
    XHR.deleteJSON('/api/task/' + th.getId(), cb);
}

function addTask() {
    var text = document.getElementsByClassName('add-item-area')[0].value;
    XHR.postJSON('/api/task', { text: text}, function (code, res) {
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
    getInitialState: function () {
        var taphandler = new TapHandler();
        taphandler.swipeLeftCB = this.onSwipeLeft;
        taphandler.swipeRightCB = this.onSwipeRight;
        return {
            taphandler: taphandler,
            edit: false,
            delete: false,
            id: this.props.id,
            text: this.props.text
        };
    },
    
    changeText: function (event) {
        this.setState({text: event.target.value});
    },
    
    updateTask: function (event) {
        changeTask(this.state.id, this.state.text);
    },
    
    onSwipeLeft: function () {
        this.setState({ delete: true });
    },
    
    onSwipeRight: function () {
        this.setState({ delete: false });
    },
    
    onClick: function () {
        this.setState({ edit: !this.state.edit });
    },
    
    onTextAreaClick: function (event) {
        event.stopPropagation();
    },
    
    render: function () {
        var innerContent;
        if (this.state.edit) {
            innerContent =  (
                <div className="task-item__editor">
                    <textarea 
                    className="task-item__editor__area" 
                    value={this.state.text}
                    onChange={this.changeText}
                    onClick={this.onTextAreaClick}>
                    </textarea>
                    <br />
                    <button 
                    onClick={this.updateTask}
                    className="task-item__save-button">
                        Сохранить
                    </button>
                </div>
            );
        } else {
            innerContent = <div className="task-item__name">{this.state.text}</div>;
        }
        return (
            <div className="task-item task-item_delete_false"
                onTouchStart={this.state.taphandler.touchStart}
                onTouchMove={this.state.taphandler.touchMove}
                onTouchEnd={this.state.taphandler.touchEnd}
                onClick={this.onClick}
                >
                {innerContent}
            </div>
        );
    }
    
});

var TaskList = React.createClass({

    getInitialState: function () {
        return {tasks: []};
    },
    
    componentDidMount: function () {
        addTaskCB = this.addTask;
        clearTasksCB = this.clearTasks;
        setTimeout(completelyLoaded(), 0);
    },
    
    addTask: function (task) {
        this.setState({ tasks: this.state.tasks.concat(task)});
    },
    
    clearTasks: function () {
        this.setState({ tasks: [] });
    },

    render: function () {
        var items = [];
        this.state.tasks.forEach(function (task) {
            items.push(<TaskItem key={task.id} id={task.id} text={task.text} />);
        });
        return <div>{items}</div>;
    }
});

var addTaskCB;
var clearTasksCB;

function completelyLoaded() {
    document.getElementsByClassName('task-item__add-button')[0]
    .addEventListener('click', addTask);
    var updateHandler = 
        new TapHandler(document.getElementsByClassName('task-list')[0]);
   updateHandler.swipeDownCB = getNewTasks;
}

window.addEventListener('load', function () {
   var tasklist = React.createElement(TaskList, null);
   ReactDOM.render(
	tasklist,
	document.getElementsByClassName('task-list__append-zone')[0]);
});

window.addEventListener('load', getTasks);
