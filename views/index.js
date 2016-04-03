refresh();

document.addEventListener('touchstart', setTouchStartEvent, false);
document.addEventListener('touchend', setTouchEndEvent, false);

var addButton = document.querySelector('.butn-to-add');
addButton.addEventListener('click', function (event) {
    var newText = document.querySelector('.text-to-add').value;
    newText ? addTask(newText) : alert('Нельзя добавить пустое задание');
});

function refresh() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/list', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var refreshBlock = document.querySelector('.pull-and-refresh');
            refreshBlock.style.display = 'none';
            var taskContainer = document.querySelector('.tasks-container');
            taskContainer.innerHTML = xhr.responseText;
        }
    }
}

function addTask(text) {
    document.querySelector('.text-to-add').value = '';
    var xhr = new XMLHttpRequest();
    var params = 'text=' + encodeURIComponent(text);
    xhr.open('POST', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            refresh();
        }
    }
}

function removeTask(id) {
    var xhr = new XMLHttpRequest();
    var params = 'id=' + encodeURIComponent(id);
    xhr.open('DELETE', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            refresh();
        }
    }
}

function editTask(id, text) {
    var xhr = new XMLHttpRequest();
    var params = 'id=' + encodeURIComponent(id) + '&text=' + encodeURIComponent(text);
    xhr.open('PUT', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            refresh();
        }
    }
}

var startX,
    startY,
    startT;

function setTouchStartEvent(event) {
    startX = event.changedTouches[0].pageX;
    startY = event.changedTouches[0].pageY;
    startT = new Date().getTime();
    var element = event.target;

    if (event.targetTouches.length === 1 &&
        element.id.indexOf('delete') != -1) {
        var id = element.id.split('_')[1];
        removeTask(id);
    }
}

function setTouchEndEvent(event) {
    var deltaX = event.changedTouches[0].pageX - startX,
        deltaY = event.changedTouches[0].pageY - startY,
        deltaT = new Date().getTime() - startT,
        element = event.target,
        minUpDelta = 70,
        delta = 15;

    var isSwipeToUp = deltaY >= minUpDelta;
    var isHorizontalSwipe = Math.abs(deltaY) < delta;
    var isSwipeToLeft = deltaX <= -delta;
    var isSwipeToRight = deltaX > 0;
    var isTheSame = deltaX === 0 && deltaY === 0 && deltaT > delta;

    if (isSwipeToUp) {
        pullAndRefreshEvent();
    }
    if (isHorizontalSwipe && isSwipeToLeft) {
        swipeToLeft(element);
    }
    if (isHorizontalSwipe && isSwipeToRight) {
        swipeToRight(element);
    }
    if (isTheSame) {
        touchToEdit(element);
    }
}

function pullAndRefreshEvent() {
    var parElement = document.querySelector('.pull-and-refresh');
    parElement.style.display = 'block';
    setTimeout(refresh, 2000);
}

function swipeToLeft(element) {
    if (element.className.indexOf('task') != -1) {
        var id = element.id.split('_')[1];
        if (!hasDeleteDiv(id)) {
            var task = document.querySelector('#task_' + id);
            var deleteDiv = document.createElement('div');
            deleteDiv.className = 'task__delete';
            deleteDiv.id = 'delete_' + id;
            deleteDiv.innerHTML = '<i class="fa fa-trash"></i>';
            task.appendChild(deleteDiv);
        }        
    }
}

function hasDeleteDiv(id) {
    var deleteDiv = document.querySelector('#delete_' + id);
    var res = deleteDiv ? true: false;
    return res;
}

function swipeToRight(element) {
    if (element.className.indexOf('task') != -1) {
        var id = element.id.split('_')[1];
        var task = document.querySelector('#task_' + id);
        var node = document.querySelector('#delete_' + id);
        task.removeChild(node);
        task.className = 'task';
    }
}

function touchToEdit(element) {
    var id = element.id.split('_')[1];
    var isCorrectObj = element.id.indexOf('task') != -1 || element.id.indexOf('text') != -1;
    if (isCorrectObj && !checkFormExists()) {
        var task = document.querySelector('#task_' + id);        
        var oldText = document.querySelector('#text_' + id).innerHTML;
        task.innerHTML = '';
        task.appendChild(createEditForm(id, oldText));
        editEvent(id);
    }
}

function checkFormExists() {
    var result = document.querySelector('.task__edit-form') ? true : false;
    return result;
}

function createEditForm(id, oldText) {
    var form = document.createElement('div');
    form.className = 'task__edit-form';
    form.id = 'edit-form_' + id;

    var inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.setAttribute('value', oldText);
    inputText.className = 'task__edit-text'; 
    inputText.id = 'edit-text_' + id;
    form.appendChild(inputText);

    var inputSubmit = document.createElement('input');
    inputSubmit.type = 'submit';
    inputSubmit.setAttribute('value', 'Сохранить');
    inputSubmit.className = 'task__edit-submit'; 
    inputSubmit.id = 'edit-submit_' + id;    
    form.appendChild(inputSubmit);

    return form;
}

function editEvent(id) {
    var inputSubmit = document.querySelector('#edit-submit_' + id);
    var inputText = document.querySelector('#edit-text_' + id);
    inputSubmit.addEventListener('click', function (event) {
        editTask(id, inputText.value);
    });
}
