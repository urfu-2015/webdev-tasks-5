
function createButton(options) {
    var button = document.createElement('div');
    button.className = options.class;
    if (options.image) {
        var buttonImg = document.createElement('img');
        buttonImg.src = options.image.src;
        buttonImg.className = options.image.class;
        button.appendChild(buttonImg);
    }
    options.text ? button.textContent = options.text : null;
    return button;
}
function createTask(taskData) {
    var task = document.createElement('div');
    task.className += 'task-list-item';
    task.setAttribute('taskid', taskData.id);
    var taskTextField = document.createElement('div');
    taskTextField.className += 'task-list-item-text';
    taskTextField.textContent = taskData.text;
    task.appendChild(taskTextField);
    touchHandler.makeTouchable(task);
    touchHandler.setEventListener('swipe', task, function (evt) {
        if (
            task.children.length === 1
        ) {
            var taskDeletionBtn = createButton({
                class: 'task-list-item-del',
                image: {src: 'images/delete.png'}
            });
            touchHandler.makeTouchable(taskDeletionBtn);
            touchHandler.setEventListener('tap', taskDeletionBtn, function (evt) {
                var xhr = new XMLHttpRequest();
                xhr.open('DELETE', '/tasks/' + task.getAttribute('taskid'));
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send();
                task.style.opacity = '0.3';
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (xhr.status === 200) {
                        var taskList = document.querySelector('.task-list');
                        taskList.removeChild(task);
                    }
                };
            });
            task.appendChild(taskDeletionBtn);
            var untargetHandler = function () {
                task.removeChild(taskDeletionBtn);
            };
            touchHandler.setEventListener('touchleave', task, untargetHandler);
        }
    });
    touchHandler.setEventListener('tap', task, function (evt) {
        if (
            task.children.length === 1
        ) {
            var taskTextArea = document.createElement('textarea');
            taskTextArea.className += 'task-list-item-text-area';
            var taskTextField = task.children[0];
            taskTextArea.textContent = taskTextField.textContent;
            task.replaceChild(taskTextArea, taskTextField);
            var taskSubmitBtn = createButton({
                class: 'task-list-item-text-submit-btn',
                image: {
                    src: 'images/ok.png',
                    class: 'task-list-item-text-submit-btn-img'
                }
            });
            touchHandler.makeTouchable(taskSubmitBtn);
            touchHandler.setEventListener('tap', taskSubmitBtn, function (evt) {
                if (task.getAttribute('taskid')) {
                    var method = 'PATCH';
                    var path = '/tasks/' + task.getAttribute('taskid');
                    var successCode = 200;
                } else {
                    var method = 'POST';
                    var path = '/tasks';
                    var successCode = 201;
                }
                var xhr = new XMLHttpRequest();
                xhr.open(method, path);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    text: taskTextArea.value
                }));
                task.style.opacity = '0.3';
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (xhr.status === successCode) {
                        task.setAttribute('taskid', JSON.parse(xhr.responseText).id);
                        taskTextField.textContent = taskTextArea.value;
                        task.style.opacity = '1';
                    }
                };
            });
            task.appendChild(taskSubmitBtn);
            touchHandler.makeTouchable(taskTextArea);
            touchHandler.setEventListener('touchleave', taskTextArea, function (evt) {
                task.removeChild(taskSubmitBtn);
                task.replaceChild(taskTextField, taskTextArea);
            });
        }
    }, false);
    return task;
}

function getTasks() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/tasks');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var tasksData = JSON.parse(xhr.responseText).tasks;
            var taskList = document.querySelector('.task-list');
            tasksData.forEach((taskData) => {
                var task = createTask(taskData);
                taskList.insertBefore(task, taskList.children[0]);            
            });
        }
    }
}
getTasks();
var taskList = document.querySelector('.task-list');
var taskAdditionBtn = createButton({
    class: 'task__addition-btn',
    text: 'Добавить'
});
touchHandler.makeTouchable(taskAdditionBtn);
touchHandler.setEventListener('tap', taskAdditionBtn, function (evt) {
    taskList.insertBefore(createTask({id:'', text:''}), taskList.children[0]);
});
taskList.appendChild(taskAdditionBtn);
