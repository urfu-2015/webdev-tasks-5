refresh();

var addButton = document.querySelector('.butn-to-add');
addButton.addEventListener('click', function (event) {
    var newText = document.querySelector('.text-to-add').value;
    newText ? addTask(newText) : alert('Нельзя добавить пустое задание');
});

ontouch(document, pullAndRefreshEvent, false);

function refresh() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/list', true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var loader = document.querySelector('.pull-and-refresh__loader');
            loader.style.display = 'none';

            var refreshBlock = document.querySelector('.pull-and-refresh');
            refreshBlock.style.height = '0px';
            refreshBlock.classList.add('pull-and-refresh-hidden');

            var taskContainer = document.querySelector('.tasks-container');
            taskContainer.innerHTML = xhr.responseText;
            [].forEach.call(document.querySelectorAll('.task'), function (task) {
                swipeHandler(task);
            });
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

function pullAndRefreshEvent(event, direction, phase, swipetype, distance) {
    var parElement = document.querySelector('.pull-and-refresh');
    var oldHeight =  parseFloat(window.getComputedStyle(parElement).height);
    var maxRefreshBlockHeight = 100;
    var loader = document.querySelector('.pull-and-refresh__loader');

    if (direction === 'down') {
        var newHeight = Math.min(oldHeight + distance, maxRefreshBlockHeight);
        parElement.style.height = newHeight + 'px';
        parElement.classList.remove('pull-and-refresh-hidden');
        
        if (newHeight === maxRefreshBlockHeight) {
            loader.style.display = 'block';
            setTimeout(refresh, 1500);
        }
    }

    if (direction === 'up') {
        loader.style.display = 'none';
        parElement.style.height = '0px';
        parElement.classList.add('pull-and-refresh-hidden');
    }
}

function swipeHandler (node) {
    var maxDeleteButtonWidth = parseFloat(window.getComputedStyle(node).width) * 0.25;
    var deleteButton = node.querySelector('.task__delete');

    ontouch(node, function (event, direction, phase, swipetype, distance) {
        var element = event.target; 
        var isTap = event.targetTouches.length === 1;
        var isTheSame = direction === 'none' && !distance;
        //tap to delete
        if (phase === 'start') {
            var toDelete = element.id.indexOf('delete') != -1;
            if (isTap && toDelete) {
                setDeleteEvent(element);
            }
        }
        //tap to edit
        if (phase === 'end' && isTheSame) {
            var toEdit = element.id.indexOf('task') != -1 ||
                element.id.indexOf('text') != -1;
            if (toEdit) {
                touchToEdit(element);
            }
        }
        var buttonWidth = parseFloat(window.getComputedStyle(deleteButton).width);
        //swipe to left
        if (direction === 'left') {
            deleteButton.classList.remove('task__delete-hidden');
            var newWidth = Math.min(buttonWidth + Math.abs(distance), maxDeleteButtonWidth);
            deleteButton.style.width = newWidth + 'px';
        }
        //swipe to right
        if (direction === 'right') {
            var newWidth = Math.max(0, buttonWidth - distance);
            if (newWidth === 0) {
                deleteButton.classList.add('task__delete-hidden');
            }
            deleteButton.style.width = newWidth + 'px';
        }
    });
};

function ontouch (element, callback) {
    var dir,
    swipeType,
    startX,
    startY,
    distX,
    distY,
    threshold = 150,
    restraint = 100,
    allowedTime = 500,
    deltaTime,
    startTime;
 
    element.addEventListener('touchstart', function (event) {
        dir = 'none';
        swipeType = 'none';
        dist = 0;
        startX = event.changedTouches[0].pageX;
        startY = event.changedTouches[0].pageY;
        startTime = new Date().getTime();
        callback(event, 'none', 'start', swipeType, 0); 
    }, false)
 
    element.addEventListener('touchmove', function (event) {
        var touchobj = event.changedTouches[0]
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        
        if (Math.abs(distX) > Math.abs(distY)) {
            dir = (distX < 0)? 'left' : 'right'
            callback(event, dir, 'move', swipeType, distX);
        } else {
            dir = (distY < 0)? 'up' : 'down';
            callback(event, dir, 'move', swipeType, distY);
        }
    }, false)
 
    element.addEventListener('touchend', function (event) {
        var touchobj = event.changedTouches[0]
        deltaTime = new Date().getTime() - startTime;

        if (deltaTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                swipeType = dir // "left" or "right"
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipeType = dir // "up" or "down"
            }
        }
        callback(event, dir, 'end', swipeType, (dir =='left' || dir =='right')? distX : distY);
    }, false)
}

function setDeleteEvent (element) {
    var id = element.id.split('_')[1];
    removeTask(id);
}

function touchToEdit(element) {
    var id = element.id.split('_')[1];
    if (!checkFormExists()) {
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
