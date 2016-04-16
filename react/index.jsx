import React from 'react';
import ReactDOM from 'react-dom';
import {createNote, updateNote, removeNote, getListNotes} from './actions.jsx';
import Notes from './notesList.jsx';

var notes = document.getElementsByClassName('notes__note-block')[0];
var notesList = [];

reloadDocument();
touchMoveDocument();

function reloadDocument() {
    getListNotes(notesFromMemory => {
        notesList = [];
        for (var i = 0; i < notesFromMemory.length; i++) {
            var note = {};
            note.id = notesFromMemory[i].createdAt;
            note.text = notesFromMemory[i].text;
            notesList.push(note);
        }
        ReactDOM.render(<Notes noteElement={notesList}/>, notes);
    });
}

function touchMoveDocument() {
    var startPointY;
    var isImage = false;

    document.body.addEventListener('touchstart', event => {
        startPointY = event.changedTouches[0].pageY;
    });

    document.body.addEventListener('touchmove', event => {
        var currentPointY = event.changedTouches[0].pageY;
        if (currentPointY - startPointY > 50) {
            if (!isImage) {
                isImage = true;
                var image = document.createElement('img');
                image.src = '/but.gif';
                var header = document.getElementsByTagName('header')[0];
                document.body.insertBefore(image, header);
            }
        }
    });

    document.body.addEventListener('touchend', event => {
        var currentPointY = event.changedTouches[0].pageY;
        if (currentPointY - startPointY > 50) {
            setTimeout(() => {
                document.body.removeChild(document.getElementsByTagName('img')[0]);
                reloadDocument();
                isImage = false;
            }, 500);
        }
    });
}

var inputs = document.getElementsByClassName('add-note__submit');
addEventListenerCreateInput(inputs[0]);

function addEventListenerCreateInput(input) {
    input.addEventListener('touchstart', event => {
        var inputText = document.getElementsByClassName('add-note__input')[0];
        var text = inputText.value ? inputText.value : 'Название';
        var id = Date.now();
        var idValue = 'id=' + id;
        var textValue = 'text=' + text + '&' + idValue;

        createNote(textValue, (err) => {
            notesList.unshift({id, text});
            ReactDOM.render(<Notes noteElement={notesList}/>, notes);
        });
        inputText.value = '';
        scroll(0,0);
    });
}
