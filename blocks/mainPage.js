
import React from 'react';
import ReactDom from 'react-dom';
import TaskList from './tasklist.js';
import RefreshSign from './refreshSign.js';
const sendRequest = require('../public/scripts/xml-http.js').sendRequest;

var taskList = null;
document.prevEvent = null;

var isTaskEvent = function (evt) {
    if (evt.target.className.indexOf('task') !== -1) {
        return true;
    } else {
        return false;
    }
};

var getTaskNumber = function (evt) {
    return evt.target.className.match(/task_num_(-?\d+)/);
};

var submitTask = function (taskNum) {
    var taskText = document.querySelector('.task__text.' + taskNum[0]);
    if (taskNum[1] === '-1') {
        var method = 'POST';
        var path = '/tasks';
        var cb = function (xhr) {
            taskList.setState({
                tappedTask: null,
                swipedTask: null,
                editingTask: false
            });
            setTimeout(function () {
                taskList.props.tasks.unshift({
                    id: JSON.parse(xhr.responseText).id,
                    text: taskText.value
                });
                taskList.setState({addingTask: false});
            }, 300);
        };
    } else {
        var method = 'PATCH';
        var path = '/tasks/' + taskNum[1];
        var cb = function (xhr) {
            taskList.setState(taskList.getInitialState());
        };
    }
    sendRequest({text: taskText.value}, {method, path}, cb);
};

var deleteTask = function (taskNum) {
    var options = {
        method: 'DELETE',
        path: '/tasks/' + taskNum[1]
    };
    var cb = function (xhr) {
        var tasksData = taskList.props.tasks;
        for (var i = 0; i < tasksData.length; i++) {
            if (tasksData[i].id.toString() === taskNum[1]) {
                taskList.props.tasks.splice(i, 1);
                break;
            }
        }
        taskList.setState(taskList.getInitialState());
    };
    sendRequest(null, options, cb);
};

var onTaskTap = function (evt) {
    var taskNum = getTaskNumber(evt);
    if (evt.target.className.indexOf('task__btn') !== -1) {
        if (taskList.state.tappedTask) {
            submitTask(taskNum);
            return;
        }
        if (taskList.state.swipedTask) {
            deleteTask(taskNum);
            return;
        }
    }
    if (
        !taskList.state.tappedTask &&
        !taskList.state.swipedTask
    ) {
        taskList.setState({tappedTask: taskNum[1]});
        setTimeout(function () {
            taskList.setState({editingTask: true});
        }, 300);
    }
};

var onTaskSwipe = function (evt) {
    if (
        !taskList.state.tappedTask &&
        !taskList.state.swipedTask
    ) {
        var taskNum = getTaskNumber(evt);
        taskList.setState({swipedTask: taskNum[1]});
        setTimeout(function () {
            taskList.setState({editingTask: true});
        }, 300);
    }
};

var onScroll = function (evt) {
    refreshSign.setState({shown: true});
    getTasks(function () {
        setTimeout(function () {
            refreshSign.setState({shown: false});
        }, 300);
    });
};

document.addEventListener('touchstart', function (evt) {
    if (
        document.prevEvent &&
        isTaskEvent(evt) &&
        isTaskEvent(document.prevEvent) &&
        getTaskNumber(evt)[1] !== getTaskNumber(document.prevEvent)[1]
    ) {
        taskList.setState(taskList.getInitialState());
    }
    document.prevEvent = evt;
});

document.addEventListener('touchmove', function (evt) {
    if (document.prevEvent.type === 'touchmove') {
        var currTouch = evt.touches[0];
        var prevTouch = document.prevEvent.touches[0];
        var diffX = prevTouch.pageX - currTouch.pageX;
        var diffY = currTouch.pageY - prevTouch.pageY;
        var touchesDiff = Math.sqrt(diffX * diffX + diffY * diffY);
        var sine = Math.abs(diffX) / touchesDiff;
        if (
            sine <= 0.5 &&
            diffY > 0
        ) {
            onScroll(evt);
        }
        if (
            sine === 1 &&
            diffX > 0 &&
            isTaskEvent(evt)
        ) {
            onTaskSwipe(evt);
        }
    }
    document.prevEvent = evt;
});

document.addEventListener('touchend', function (evt) {
    if (document.prevEvent.type === 'touchstart') {
        if (isTaskEvent(evt)) {
            onTaskTap(evt);
        } else {
            taskList.setState(taskList.getInitialState());
        }
        if (evt.target.classList.contains('addition-btn')) {
            taskList.setState({addingTask: true});
        }
    }
    document.prevEvent = evt;
});

var refreshSign = ReactDom.render(<RefreshSign />, document.querySelector('.page-top'));

function getTasks(cb) {
    var _cb = function (xhr) {
        var resJSON = JSON.parse(xhr.responseText);
        document.date = new Date(xhr.getResponseHeader('Date'));
        taskList = ReactDom.render(
            <TaskList tasks = {resJSON.tasks} />,
            document.querySelector('.root')
        );
        cb ? cb() : null;
    };
    sendRequest(null, {method: 'GET', path: '/tasks'}, _cb);
}

getTasks();
