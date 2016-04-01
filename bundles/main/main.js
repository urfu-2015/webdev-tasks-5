require('./main.css');

document.addEventListener('DOMContentLoaded', initialState);

document.addEventListener('touchstart', event => {
    if (event.touches.length > 1) {
        return;
    }
    controlTouchStart(event);
});

document.addEventListener('touchend', event => {
    if (event.touches.length > 1) {
        return;
    }
    controlTouchEnd(event);
});

document.addEventListener('touchmove', event => {
    if (event.touches.length > 1) {
        return;
    }
    controlTouchMove(event);
});

function initialState() {
    let buttonAdd = document.querySelector('.new-note__button-add');
    buttonAdd.addEventListener('tap', event => controlButtonAdd(event));

    let buttonsDel = [].slice.call(document.querySelectorAll('.notes-item__delete'));
    buttonsDel.forEach(button => controlDelButton(button));

    let notesItem = [].slice.call(document.querySelectorAll('.notes__item'));
    notesItem.forEach(note => addEventsHandlers(note));

    let saveButton = document.querySelector('.new-note-form__button');
    saveButton.addEventListener('tap', () => {
        let newTask = document.querySelector('.new-note-form__input').value;
        doRequest('POST', '/todos/add', {task: newTask}, res => createNewTask(res));
    });
}

function controlDelButton(button) {
    button.addEventListener('tap', event => {
        let deleteNoteId = event.target.parentNode.getAttribute('id');
        doRequest('DELETE', '/todos/delete', {id: deleteNoteId}, res => {
            document.getElementById(res.id).remove();
        });
    });
}

function addEventsHandlers(note) {
    note.addEventListener('swipe-left', event => {
        // event.preventDefault();
        // event.stopPropagation();

        event.target.classList.add('swiped-note');
        let parentId = event.target.parentNode.getAttribute('id');
        let currentTrash = document.querySelector(`li[id="${parentId}"] .notes-item__delete`);
        currentTrash.classList.remove('notes-item__delete_invisible');
    });

    note.addEventListener('swipe-right', event => {
        if (event.target.classList.contains('swiped-note')) {
            event.target.classList.remove('swiped-note');

            let parentId = event.target.parentNode.getAttribute('id');
            let currentTrash = document.querySelector(`li[id="${parentId}"] .notes-item__delete`);
            currentTrash.classList.add('notes-item__delete_invisible');
        }
    });

    note.addEventListener('swipe-down', () => {
        let updateProgress = document.querySelector('.update-progress');
        updateProgress.classList.add('update-progress_visible');
        doRequest('GET', '/todos', null, () => {
            updateProgress.classList.remove('update-progress_visible');
        });
    });

    note.addEventListener('tap', event => updateNote(event.target));
}

function controlButtonAdd(event) {
    event.target.classList.remove('new-note__button_visible');
    event.target.classList.add('new-note__button_invisible');

    let form = document.querySelector('.new-note__form');
    form.classList.remove('new-note-form_invisible');
}

function createNewTask(note) {
    let newLi = document.createElement('li');
    newLi.id = note.id;
    newLi.classList.add('notes__item');

    let newTask = document.createElement('div');
    newTask.classList.add('notes-item__task');
    newTask.innerHTML = note.task;
    newLi.appendChild(newTask);

    let newTrash = document.createElement('div');
    newTrash.classList.add('notes-item__delete', 'notes-item__delete_invisible');
    newTrash.addEventListener('tap', event => {
        let deleteNoteId = event.target.parentNode.getAttribute('id');
        doRequest('DELETE', '/todos/delete', {id: deleteNoteId}, () => {
            document.getElementById(note.id).remove();
        });
    });
    newLi.appendChild(newTrash);

    addEventsHandlers(newLi);

    document.querySelector('.notes').appendChild(newLi);
    document.querySelector('.new-note-form__input').value = '';
}

function updateNote(note) {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let button = document.createElement('button');
    let noteId = note.id.split('-')[1];
    console.log(noteId);

    form.classList.add('update-form');
    form.setAttribute('name', 'update');

    input.setAttribute('type', 'text');
    input.setAttribute('name', 'task');
    input.setAttribute('value', note.target.innerText);
    input.classList.add('update-text');

    button.setAttribute('type', 'button');
    button.innerText = 'Сохранить';
    button.classList.add('update-button');
    button.addEventListener('tap', event => {
        let newTask = event.target.previousSibling.value;
        note.removeChild(form);
        note.innerHTML = newTask;
        doRequest('PUT', '/todos/edit', {id: noteId, newText: newTask}, () => {});
    });

    form.appendChild(input);
    form.appendChild(button);
    note.innerText = '';
    note.appendChild(form);
}

var currentEvent = {};

function controlTouchStart(event) {
    currentEvent.startTime = new Date();
    currentEvent.startPosition = {
        x: event.changedTouches[0].pageX,
        y: event.changedTouches[0].pageY
    };
    currentEvent.startObject = event.target;
}

function controlTouchEnd(event) {
    let xAbs = Math.abs(event.changedTouches[0].pageX - currentEvent.startPosition.x);
    let yAbs = Math.abs(event.changedTouches[0].pageY - currentEvent.startPosition.y);

    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (event.changedTouches[0].pageX < currentEvent.startPosition.x) {
                /* СВАЙП ВЛЕВО*/
                event.target.dispatchEvent(new Event('swipe-left', {bubbles: true}));
            } else {
                /* СВАЙП ВПРАВО*/
                event.target.dispatchEvent(new Event('swipe-right', {bubbles: true}));
            }
        } else {
            if (event.changedTouches[0].pageY > currentEvent.startPosition.y) {
                /* СВАЙП ВНИЗ*/
                event.target.dispatchEvent(new Event('swipe-down', {bubbles: true}));
            }
        }
    } else {
        event.target.dispatchEvent(new Event('tap', {bubbles: true}));
    }
}

function controlTouchMove() {
}

/* eslint max-params: [2, 4] */
function doRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
            return;
        }

        if (xhr.status === 200) {
            if (callback) {
                let data = {};
                try {
                    data = JSON.parse(xhr.responseText);
                } catch (err) {
                    console.error('ERROR:', err);
                }
                callback(data);
            }
        } else {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
    };

    xhr.open(method, url, true);
    if (data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}
