'use strict';
(function () {
    /* eslint max-params: [2, 4] */
    function request(type, url, data, cb) {
        var xhr = new XMLHttpRequest();

        xhr.open(type, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status === 202) {
                cb();
                return;
            }
            if (xhr.status === 200) {
                cb(null, JSON.parse(xhr.responseText));
            } else {
                cb({status: xhr.status, text: xhr.statusText});
            }
        };
    }

    request('GET', '/tasks', null, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        displayTasks(data);
    });

    var addTaskButton = document.getElementsByClassName('add-task__button')[0];
    addTaskButton.addEventListener('touchstart', displayAddTaskFormListener);
    document.body.addEventListener('touchstart', updateTasksListener);

    function displayAddTaskFormListener(e) {
        tap(e, displayAddTaskForm);
    }

    function addTaskListener(e) {
        tap(e, addTask);
    }

    function displayDeleteButtonListener(e) {
        swipe(e, 'left', displayDeleteButton);
    }

    function removeDeleteButtonListener(e) {
        swipe(e, 'right', removeDeleteButton);
    }

    function updateTasksListener(e) {
        swipe(e, 'down', updateTasks);
    }

    function editTaskListener(e) {
        tap(e, editTask);
    }

    function deleteTaskListener(e) {
        tap(e, deleteTask);
    }

    function displayTasks(tasks) {
        var taskDivs = document.getElementsByClassName('task');
        while (taskDivs.length !== 0) {
            [].forEach.call(taskDivs, function (task) {
                task.remove();
            });
            taskDivs = document.getElementsByClassName('task');
        }
        tasks.forEach(function (task) {
            displayTask(task);
        });
    }

    function displayTask(task) {
        var taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.dataset.id = task.id;
        taskDiv.innerHTML = '<div class="task__name">' + task.text + '</div>';
        taskDiv.addEventListener('touchstart', displayDeleteButtonListener);
        taskDiv.addEventListener('touchstart', editTaskListener);
        var taskDivs = document.getElementsByClassName('task');
        if (task.position === taskDivs.length) {
            document.getElementsByClassName('tasks')[0].appendChild(taskDiv);
            return;
        }
        document.getElementsByClassName('tasks')[0].insertBefore(taskDiv, taskDivs[task.position]);
    }

    function updateTasks() {
        if (document.getElementsByClassName('refresh').length === 0) {
            var tasks = document.getElementsByClassName('tasks')[0];
            var refresh = document.createElement('div');
            refresh.className = 'refresh';
            document.body.insertBefore(refresh, tasks);
        }
        var refreshAnimation = setInterval(function () {
            var angle = 360;
            var refresh = document.getElementsByClassName('refresh')[0];
            if (refresh.style.transform) {
                angle = parseInt(refresh.style.transform.replace(/rotate\((\d+)deg\)/, '$1'), 10);
            }
            refresh.style.transform = 'rotate(' + (angle + 45) + 'deg)';
        }, 250);
        request('GET', '/tasks', null, function (err, tasks) {
            if (err) {
                console.error(err);
                return;
            }
            displayTasks(tasks);
            clearInterval(refreshAnimation);
            var refreshImg = document.getElementsByClassName('refresh')[0];
            if (refreshImg) {
                refreshImg.remove();
            }
        });
    }

    function displayAddTaskForm() {
        var nameInput = document.createElement('input');
        nameInput.className = 'add-task__name';
        document.getElementsByClassName('add-task')[0].insertBefore(nameInput, addTaskButton);
        addTaskButton.removeEventListener('touchstart', displayAddTaskFormListener);
        addTaskButton.addEventListener('touchstart', addTaskListener);
    }

    function addTask() {
        var nameInput = document.getElementsByClassName('add-task__name')[0];
        request('POST', '/tasks', {text: nameInput.value}, function (err, task) {
            if (err) {
                console.error(err);
                return;
            }
            nameInput.remove();
            addTaskButton.removeEventListener('touchstart', addTaskListener);
            addTaskButton.addEventListener('touchstart', displayAddTaskFormListener);
            displayTask(task);
        });
    }

    function displayDeleteButton(e) {
        if (document.getElementsByClassName('task__delete-button').length !== 0) {
            return;
        }
        var task = e.currentTarget;
        task.removeEventListener('touchstart', editTaskListener);
        task.removeEventListener('touchstart', displayDeleteButtonListener);
        task.children[0].style.marginLeft = '-30px';
        var deleteButton = document.createElement('div');
        deleteButton.addEventListener('touchstart', deleteTaskListener);
        deleteButton.className = 'task__delete-button';
        task.appendChild(deleteButton);
        task.addEventListener('touchstart', removeDeleteButtonListener);
    }

    function deleteTask(e) {
        var button = e.currentTarget;
        var task = button.parentElement;
        request('DELETE', '/tasks/' + task.dataset.id, {}, function (err) {
            if (err) {
                console.error(err);
                return;
            }
            task.remove();
        });
    }

    function removeDeleteButton(e) {
        var task = e.currentTarget;
        task.removeEventListener('touchstart', removeDeleteButtonListener);
        var buttonDiv = task.children[1];
        if (buttonDiv) {
            buttonDiv.remove();
        }
        task.children[0].style.marginLeft = '';
        task.addEventListener('touchstart', displayDeleteButtonListener);
        task.addEventListener('touchstart', editTaskListener);
    }

    function editTask(e) {
        var task = e.currentTarget;
        task.className = 'task_edit';
        task.removeEventListener('touchstart', editTaskListener);
        var taskTextDiv = task.children[0];
        var taskText = taskTextDiv.innerText;
        taskTextDiv.remove();
        var editTaskInput = document.createElement('input');
        editTaskInput.className = 'task__edit-field';
        editTaskInput.value = taskText;
        task.appendChild(editTaskInput);
        var saveChangeButton = document.createElement('button');
        saveChangeButton.className = 'task__save-edit';
        saveChangeButton.innerText = 'Сохранить';
        saveChangeButton.addEventListener('touchstart', function (e) {
            tap(e, function () {
                request('POST', '/tasks/' + task.dataset.id, {text: editTaskInput.value},
                    function (err, taskData) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        task.remove();
                        displayTask(taskData);
                    });
            });
        });
        task.appendChild(saveChangeButton);
    }

    function swipe(e, dir, cb) {
        if (e.targetTouches.length !== 1) {
            return;
        }
        // e.preventDefault();
        // e.stopPropagation();
        var start = {
            pageX: e.targetTouches[0].pageX,
            pageY: e.targetTouches[0].pageY
        };
        e.currentTarget.addEventListener('touchmove', move);

        function move(e) {
            if (e.targetTouches.length !== 1) {
                e.currentTarget.removeEventListener('touchmove', move);
                return;
            }
            // e.preventDefault();
            // e.stopPropagation();
            var touch = e.targetTouches[0];
            if (start.pageX - touch.pageX > 50 && Math.abs(start.pageY - touch.pageY) < 30) {
                if (dir === 'left') {
                    cb(e);
                }
                e.currentTarget.removeEventListener('touchmove', move);
                return;
            }
            if (touch.pageX - start.pageX > 50 && Math.abs(start.pageY - touch.pageY) < 30) {
                if (dir === 'right') {
                    cb(e);
                }
                e.currentTarget.removeEventListener('touchmove', move);
                return;
            }
            if (start.pageY - touch.pageY > 50 && Math.abs(start.pageX - touch.pageX) < 30) {
                if (dir === 'up') {
                    cb(e);
                }
                e.currentTarget.removeEventListener('touchmove', move);
                return;
            }
            if (touch.pageY - start.pageY > 50 && Math.abs(start.pageX - touch.pageX) < 30) {
                if (dir === 'down') {
                    cb(e);
                }
                e.currentTarget.removeEventListener('touchmove', move);
            }
        }
    }

    function tap(e, cb) {
        if (e.targetTouches.length !== 1) {
            return;
        }
        var start = {
            pageX: e.targetTouches[0].pageX,
            pageY: e.targetTouches[0].pageY,
            time: new Date().getTime()
        };
        e.currentTarget.addEventListener('touchend', tapEndListener);

        function tapEndListener(e) {
            if (e.changedTouches.length !== 1) {
                return;
            }
            var time = new Date().getTime();
            var touch = e.changedTouches[0];
            if (time - start.time < 150 &&
                Math.abs(start.pageX - touch.pageX) < 20 &&
                Math.abs(start.pageY - touch.pageY) < 20) {
                cb(e);
            }
            e.currentTarget.removeEventListener('touchend', tapEndListener);
        }
    }
})();
