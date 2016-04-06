'use strict';

let notes = document.getElementsByClassName('notes__note-block')[0];

reloadDocument();
touchMoveDocument();

function reloadDocument() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/list', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            let count = notes.childNodes.length;
            while (count > 0) {
                count--;
                notes.removeChild(notes.firstChild);
            }
            let notesFromMemory = JSON.parse(xhr.responseText).notes;
            for (var i = 0; i < notesFromMemory.length; i++) {
                let note = document.createElement('div');
                note.className = 'note';

                let noteText = document.createElement('div');
                noteText.className = 'noteText';
                noteText.innerHTML = notesFromMemory[i].text;
                note.appendChild(noteText);

                notes.appendChild(note);
                swipeToDelete(noteText, note);
            }
        }
    }
    xhr.send();
}

function touchMoveDocument() {
    let startPointY;
    let isImage = false;

    document.body.addEventListener('touchstart', event => {
        startPointY = event.changedTouches[0].pageY;
    });

    document.body.addEventListener('touchmove', event => {
        let currentPointY = event.changedTouches[0].pageY;
        if (currentPointY - startPointY > 50) {
            if (!isImage) {
                isImage = true;
                let image = document.createElement('img');
                image.src = '/but.gif';
                let header = document.getElementsByTagName('header')[0];
                document.body.insertBefore(image, header);
                reloadDocument();
            }
        }
    });

    document.body.addEventListener('touchend', event => {
        let currentPointY = event.changedTouches[0].pageY;
        if (currentPointY - startPointY > 50) {
            setTimeout(() => {
                document.body.removeChild(document.getElementsByTagName('img')[0]);
                reloadDocument();
                isImage = false;
            }, 500);
        }
    });
}

function swipeToDelete(note, notes) {
    let startPointX;
    let isImage = false;

    note.addEventListener('touchstart', event => {
        startPointX = event.changedTouches[0].pageX;
    });

    note.addEventListener('touchmove', event => {
        let currentPointX = event.changedTouches[0].pageX;
        if (startPointX - currentPointX > 50) {
            if (!isImage) {
                isImage = true;
                let image = document.createElement('img');
                image.src = '/del.png';
                image.className = 'inline';
                insertAfter(image, note, notes);
                addEventListenerToImage(image, notes);
            }
        } else if (currentPointX - startPointX > 50) {
            if (isImage) {
                isImage = false;
                notes.removeChild(notes.lastChild);
            }
        } else {
            addEventListenerToNote(notes);
        }
    });

    note.addEventListener('touchend', event => {
        let currentPointX = event.changedTouches[0].pageX;
        if (Math.abs(currentPointX - startPointX) < 50) {
            addEventListenerToNote(notes);
        }
    });
}

function addEventListenerToImage(image, note) {
    image.addEventListener('touchstart', event => {
        note.parentNode.removeChild(note);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/remove', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('text=' + note.firstChild.innerHTML);
    });
}

function insertAfter(elem, refElem, parents) {
    var parent = parents;
    var next = refElem.nextSibling;
    if (next) {
        return parent.insertBefore(elem, next);
    } else {
        return parent.appendChild(elem);
    }
}

function addEventListenerToNote(note) {
    console.log('TOUCH ME');
    note.addEventListener('touchstart', event => {
        let form = document.createElement('form');
        form = createForm(form, note.firstChild.innerHTML);
        note.parentNode.replaceChild(form, note);
    });
}

function createForm(form, text) {
    form.method = 'post';
    form.action = '/';

    let input = document.createElement('input');
    input.className = 'text';
    input.type = 'text';
    input.value = text;

    let submit = document.createElement('input');
    submit.type = 'submit';

    form.appendChild(input);
    form.appendChild(submit);
    addEventListenerUpdateInput(form, text);
    return form;
}

function addEventListenerUpdateInput(form, oldText) {
    let input = form.getElementsByTagName('input')[0];
    let submit = form.getElementsByTagName('input')[1];

    submit.addEventListener('touchstart', event => {
        let oldValue = 'oldValue=' + oldText;
        let newValue = 'newValue=' + input.value;

        createNote(input.value, '/update', oldValue + '&' + newValue);
        swipeToDelete(noteText, note);
        form.parentNode.replaceChild(note, form);
    });
}

let inputs = document.getElementsByClassName('note_create__submit');
addEventListenerCreateInput(inputs[0]);

function addEventListenerCreateInput(input) {
    input.addEventListener('touchstart', event => {
        let inputText = document.getElementsByClassName('note_create__input')[0];
        createNote(inputText.value, '/', 'text=' + inputText.value);
        inputText.value = '';
        swipeToDelete(noteText, note);
    });
}

function createNote(innerHTML, action, text) {
    let note = document.createElement('div');
    note.className = 'note';
    let noteText = document.createElement('div');
    noteText.className = 'noteText';
    noteText.innerHTML = innerHTML;
    note.appendChild(noteText);
    notes.appendChild(note);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(text);
}
