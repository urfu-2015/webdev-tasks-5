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
    XHR.postJSON('/api/task', { text: text}, function (code, res) {
       createTaskOnFront(res.task);
    });
}

function createTaskOnFront(task) {
    addTaskCB(task);
}

function showLoading() {
	var loadingImages = document.getElementsByClassName('loading-image');
	if (loadingImages.length) {
		loadingImages[0].style.display = 'inline';
	}
}

function hideLoading() {
    var loadingImages = document.getElementsByClassName('loading-image');
	if (loadingImages.length) {
		loadingImages[0].style.display = 'none';
	}
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
