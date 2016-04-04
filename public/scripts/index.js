
function createBlock(options) {
    var block = document.createElement('div');
    block.className = options.class;
    if (options.image) {
        var blockImg = document.createElement('img');
        blockImg.src = options.image.src;
        blockImg.className = options.image.class;
        block.appendChild(blockImg);
    }
    options.text ? block.textContent = options.text : null;
    return block;
}
function createTask(taskData) {
    var task = createBlock({class: 'task'})
    task.setAttribute('taskid', taskData.id);
    var taskTextField = createBlock({class: 'task__text task__text_shiftable', text: taskData.text})
    task.appendChild(taskTextField);
    touchHandler.makeTouchable(taskTextField);
    touchHandler.setEventListener('swipe', taskTextField, function (evt) {
        if (
            task.children.length === 1 &&
            evt.direction === 'left'
        ) {
            taskTextField.className += ' task__text_shifted';
            var taskDeletionBtn = createBlock({
                class: 'task__btn task__btn_shown',
                image: {
                    src: 'images/delete.png',
                    class: 'task__btn-image'
                }
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
            touchHandler.setEventListener('touchleave', taskTextField, function () {
                taskTextField.classList.remove('task__text_shifted');
                taskDeletionBtn.classList.remove('task__btn_shown');
                setTimeout(() => {task.removeChild(taskDeletionBtn);}, 300);
            });
        }
    });
    touchHandler.setEventListener('tap', taskTextField, function (evt) {
        if (
            task.children.length === 1
        ) {
            var taskTextArea = document.createElement('textarea');
            taskTextArea.className += ' task__text-area task__text_shiftable';
            var taskTextField = task.children[0];
            taskTextArea.textContent = taskTextField.textContent;
            taskTextArea.className += ' task__text_shifted';
            taskTextField.className += ' task__text_shifted';
            setTimeout(() => {
                task.replaceChild(taskTextArea, taskTextField);
                taskTextArea.focus();
            }, 300);
            var taskSubmitBtn = createBlock({
                class: 'task__btn task__btn_shown',
                image: {
                    src: 'images/ok.png',
                    class: 'task__btn-image'
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
                        task.style.opacity = '';
                    }
                };
            });
            task.appendChild(taskSubmitBtn);
            touchHandler.makeTouchable(taskTextArea);
            touchHandler.setEventListener('touchleave', taskTextArea, function (evt) {
                setTimeout(() => {
                    task.removeChild(taskSubmitBtn);
                    task.replaceChild(taskTextField, taskTextArea);
                }, 300);
                taskTextField.classList.remove('task__text_shifted');
                taskTextArea.classList.remove('task__text_shifted');
                taskSubmitBtn.classList.remove('task__btn_shown');
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
var taskList = document.querySelector('.task-list');
var taskAdditionBtn = createBlock({
    class: 'addition-btn',
    text: 'Добавить'
});
touchHandler.makeTouchable(taskAdditionBtn);
touchHandler.setEventListener('tap', taskAdditionBtn, function (evt) {
    taskList.insertBefore(createTask({id:'', text:''}), taskList.children[0]);
});
getTasks();
taskList.appendChild(taskAdditionBtn);
var body = document.querySelector('body');
touchHandler.makeTouchable(body);
var refreshSign = createBlock({class: 'refresh-sign', image: {src: 'images/refresh.gif', class: 'refresh-sign__image'}});
body.insertBefore(refreshSign, body.children[0]);
touchHandler.setEventListener('scroll', body, function (evt) {
    if (
        body.scrollTop === 0 &&
        evt.direction === 'down' &&
        !refreshSign.classList.contains('refresh-sign_shown')
    ) {
        refreshSign.className += ' refresh-sign_shown';
        refreshSign.children[0].className += ' refresh-sign__image_shown';
    }
});
