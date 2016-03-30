refresh();

document.addEventListener('touchstart', setTouchStartEvent, false);
document.addEventListener('touchend', setTouchEndEvent, false);

var addButton = document.getElementsByClassName('butn-to-add')[0];
addButton.addEventListener('click', function (event) {
    event.preventDefault();
    var newText = document.getElementsByClassName('text-to-add')[0].value;
    addTask(newText);
});  

function refresh() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/list', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var refreshBlock = document.getElementsByClassName('pull-and-refresh')[0];
            refreshBlock.style.display = 'none';
            var taskContainer = document.getElementsByClassName('tasks-container')[0];
            taskContainer.innerHTML = xhr.responseText;
        }
    }
}

function addTask(text) {
    document.getElementsByClassName('text-to-add')[0].value = '';
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
    event.preventDefault();
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
    event.preventDefault();
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
    var parElement = document.getElementsByClassName('pull-and-refresh')[0];
    parElement.style.display = 'block';
    setTimeout(refresh, 1000);
}

function swipeToLeft(element) {
    if (element.className.indexOf('task') != -1) {
        var id = element.id.split('_')[1];
        var task = document.getElementById('task_' + id);
        var deleteDiv = document.createElement('div');
        deleteDiv.className = 'task__delete';
        deleteDiv.id = 'delete_' + id;
        deleteDiv.innerHTML = '<i class="fa fa-trash"></i>';
        task.appendChild(deleteDiv);
        task.className = task.className + ' task_swipedToLeft';
    }
}

function swipeToRight(element) {
    if (element.className.indexOf('task') != -1) {
        var id = element.id.split('_')[1];
        var task = document.getElementById('task_' + id);
        task.removeChild(document.getElementById('delete_' + id));
        task.className = 'task';
    }
}

function touchToEdit(element) {
    var id = element.id.split('_')[1];
    if (element.id.indexOf('task') != -1
        || element.id.indexOf('text') != -1) {        
        var task = document.getElementById('task_' + id);
        var oldText = document.getElementById('text_' + id).innerHTML;
        task.innerHTML = '';
        task.appendChild(createEditForm(id, oldText));
        //editEvent(id);
    }
    if (element.id.indexOf('edit-submit') != -1) {
        var inputText = document.getElementById('edit-text_' + id);
        editTask(id, inputText.value);
    }
}

function createEditForm(id, oldText) {
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/';
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
    var inputSubmit = document.getElementById('edit-submit_' + id);
    var inputText = document.getElementById('edit-text_' + id);
    inputSubmit.addEventListener('click', function (event) {
        event.preventDefault();
        editTask(id, inputText.value);
    });
}
