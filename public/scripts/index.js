var body = document.querySelector("body");
function createButton(options) {
    var button = document.createElement('div');
    button.className = options.class;
    var buttonImg = document.createElement('img');
    buttonImg.src = options.image.src;
    buttonImg.className = options.image.class;
    button.appendChild(buttonImg);
    return button;
}
function createTask(taskData) {
    var task = document.createElement('div');
    task.className += 'task-list-item';
    task.setAttribute('taskid', taskData.id);
    touchHandler.makeTouchable(task);
    touchHandler.setEventListener('swipe', task, function (evt) {
        if (
            evt.currentTarget.children.length === 1
        ) {
            var taskDeletionBtn = createButton({
                class: 'task-list-item-del',
                image: {src: 'images/delete.png'}
            });
            task.appendChild(taskDeletionBtn);
            var untargetHandler = function () {
                task.removeChild(taskDeletionBtn);
                body.removeEventListener("touchstart", untargetHandler); 
            };
            body.addEventListener('touchstart', untargetHandler, false);
        }
    });
    touchHandler.setEventListener('tap', task, function (evt) {
        if (
            evt.currentTarget.children.length === 1
        ) {
            var taskTextArea = document.createElement('textarea');
            taskTextArea.className += 'task-list-item-text-area';
            var taskTextField = task.children[0];
            taskTextArea.innerText = taskTextField.innerText;
            task.replaceChild(taskTextArea, taskTextField);
            var taskSubmitBtn = createButton({
                class: 'task-list-item-text-submit-btn',
                image: {
                    src: 'images/ok.png',
                    class: 'task-list-item-text-submit-btn-img'
                }
            });
            var untargetHandler = function () {
                task.removeChild(taskSubmitBtn);
                task.replaceChild(taskTextField, taskTextArea);
                body.removeEventListener("touchstart", untargetHandler); 
            };
            taskSubmitBtn.addEventListener('touchstart', function () {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/tasks');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    id: task.getAttribute('taskid'),
                    text: task.children[0].value
                }));
                untargetHandler();
                xhr.onreadystatechange = function() {
                    if (xhr.status === 201) {
                        taskTextField.innerText = taskTextArea.value;
                    }
                };
            });
            task.appendChild(taskSubmitBtn);
            body.addEventListener('touchstart', untargetHandler, false);
        }
    }, false);
    var taskTextField = document.createElement('div');
    taskTextField.className += 'task-list-item-text';
    taskTextField.innerText = taskData.text;
    task.appendChild(taskTextField);
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
            var body = document.querySelector('body');
            tasksData.forEach((taskData) => {
                var task = createTask(taskData);
                var taskList = document.querySelector('.task-list');
                taskList.appendChild(task);            
            });
        }
    }
}
getTasks();
