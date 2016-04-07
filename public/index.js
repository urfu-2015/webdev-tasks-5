// require('./index.css');


function eventListenerForNewNote() {
    const submitButton = document.getElementsByClassName('add-note')[0];
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
        //todo add listener, r
        newNote.innerHTML = inputArea.value;
        container.insertBefore(newNote, container.firstChild);
        if (isTouched) {
            submitButton.classList.remove('touched');
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send('text=' + document.getElementsByClassName("input-area")[0].value);
        }
    }, false);
}

function addMoveReaction() {
    var container = document.getElementsByClassName('notes-container')[0];
    const body = document.getElementsByTagName('body')[0];
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    body.addEventListener('touchstart', function (event) {
        var touch = event.changedTouches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    })
    body.addEventListener('touchmove', function (event) {
        touches = event.changedTouches;
        touch = touches[touches.length - 1];
        endX = touch.pageX;
        endY = touch.pageY;
        if ((endY - startY) > 20) {
            if (!body.classList.contains('refresh')) {
                body.classList.add('refresh');
            }
        }
    })
    body.addEventListener('touchend', function (event) {
        if ((endY - startY) > 20) {
            body.classList.remove('refresh');
            reloadNotes();
        }
    })
}

function addDeleteEvent (note) {
    console.log('add delete event');
    var container = document.getElementsByClassName('notes-container')[0];
    note.addEventListener('touchstart', function (event) {
        touch = event.changedTouches[0];
        startX = touch.pageX;
        startY = touch.pageY;
    })
    note.addEventListener('touchmove', function (event) {
        touches = event.changedTouches;
        touch = touches[touches.length - 1];
        endX = touch.pageX;
        endY = touch.pageY;
        if ((startX - endX) > 20 && Math.abs(startY - endY) < 10) {
            note.classList.add('for-deletion');
        }
    })
    note.addEventListener('touchend', function (event) {
        if ((startX - endX) > 20 && Math.abs(startY - endY) < 10) {
            container.removeChild(note);
            var xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send('text=' + note.innerHTML);
        }
    })
}

function reloadNotes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/notes', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status != 200) {
        } else {
            var allNotes = document.getElementsByClassName('note');
            var container = document.getElementsByClassName('notes-container')[0];
            if (allNotes.length > 0) {
                for (var noteIndex = 0; noteIndex < allNotes.length; noteIndex++) {
                    console.log(allNotes[noteIndex]);
                    container.removeChild(allNotes[noteIndex]);
                }
            }
            var notes = JSON.parse(xhr.responseText).notes;
            for (var note in notes) {
                var container = document.getElementsByClassName('notes-container')[0];
                var newNote = document.createElement('div');
                newNote.setAttribute('class', 'note');
                //todo add listener, r
                newNote.innerHTML = notes[note].text;
                container.appendChild(newNote);
                addDeleteEvent(newNote);
            }
        }
    }
    xhr.send();
};


window.onload = () => {
    reloadNotes();
    eventListenerForNewNote();
    addMoveReaction();
}
