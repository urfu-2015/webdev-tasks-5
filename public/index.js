var imgSrc = 'http://autoeurope-au2c.pricecoach.com/Content/themes/base/images/loading.gif';

function sendXHR(method, address, text) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, address, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send('text=' + text);
}

function getRefreshElement() {
    var element = document.createElement('img');
    element.setAttribute('src', imgSrc);
    element.setAttribute('class', 'reload');
    return element;
}

function getDeleteButton() {
    var button = document.createElement('div');
    element.setAttribute('class', 'delete-button');
    return element;
}

function createNotes(notes, container) {
    for (var note in notes) {
        var newNote = document.createElement('div');
        newNote.setAttribute('class', 'note');
        newNote.innerHTML = notes[note].text;
        container.appendChild(newNote);
        addDeleteEvent(newNote);
    }
}


function eventListenerForNewNote() {
    var submitButton = document.getElementsByClassName('add-note')[0];
    var allNotes = document.getElementsByClassName('note');
    var container = document.getElementsByClassName('notes-container')[0];
    var inputArea = document.getElementsByClassName("input-area")[0];
    submitButton.addEventListener('touchstart', function(event) {
        submitButton.classList.add('touched');
    }, false);
    submitButton.addEventListener('touchend', function(event) {
        var isTouched = submitButton.classList.contains('touched');
        var newNote = document.createElement('div');
        newNote.setAttribute('class', 'note');
        newNote.innerHTML = inputArea.value;
        container.insertBefore(newNote, container.firstChild);
        addDeleteEvent(newNote);
        if (isTouched) {
            submitButton.classList.remove('touched');
            sendXHR('POST', '/', document.getElementsByClassName("input-area")[0].value);
            inputArea.value = "";
        }
    }, false);
}

function addMoveReaction() {
    var container = document.getElementsByClassName('notes-container')[0];
    var body = document.getElementsByTagName('body')[0];
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    var refreshElement = getRefreshElement();
    body.addEventListener('touchstart', function(event) {
        var touch = event.changedTouches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    })
    body.addEventListener('touchmove', function(event) {
        touches = event.changedTouches;
        touch = touches[touches.length - 1];
        endX = touch.pageX;
        endY = touch.pageY;
        if ((endY - startY) > 20) {
            if (!body.classList.contains('refresh')) {
                body.classList.add('refresh');
                body.insertBefore(refreshElement, body.children[1]);
            }
        }
    })
    body.addEventListener('touchend', function(event) {
        if ((endY - startY) > 20) {
            body.classList.remove('refresh');
            body.removeChild(body.getElementsByTagName('img')[0]);
            reloadNotes();
        }
    })
}

function addDeleteEvent(note) {
    var container = document.getElementsByClassName('notes-container')[0];
    note.addEventListener('touchstart', function(event) {
        touch = event.changedTouches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    })
    note.addEventListener('touchmove', function(event) {
        touches = event.changedTouches;
        touch = touches[touches.length - 1];
        endX = touch.pageX;
        endY = touch.pageY;
        if ((startX - endX) > 30 && Math.abs(startY - endY) < 15) {
            note.classList.add('for-deletion');
        }
    })
    note.addEventListener('touchend', function(event) {
        if ((startX - endX) > 30 && Math.abs(startY - endY) < 15) {
            container.removeChild(note);
            sendXHR('DELETE', '/', note.innerHTML);
        }
    })
}


function reloadNotes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/notes', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status != 200) {
            console.log(xhr.status);
        } else {
            var allNotes = document.getElementsByClassName('note');
            var container = document.getElementsByClassName('notes-container')[0];
            if (allNotes.length > 0) {
                for (var noteIndex = 0; noteIndex < allNotes.length; noteIndex++) {
                    container.removeChild(allNotes[noteIndex]);
                }
            }
            var notes = JSON.parse(xhr.responseText).notes;
            createNotes(notes, container);
        }
    }
    xhr.send();
};


window.onload = function() {
    reloadNotes();
    eventListenerForNewNote();
    addMoveReaction();
}
