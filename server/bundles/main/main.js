'use strict';

require('./main.css');

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Main from '../../../client/components/main';
import {addNote} from '../../../client/actions';
import {todoApp} from '../../../client/reducers';

const store = createStore(todoApp);

function render() {
    ReactDom.render(
        <Main store={store} />,
        document.getElementById('root')
    );
}

render();
store.subscribe(render);


// Первый раз сами пошлем, чтобы заполнить
fetch('/api/notes')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        data.notes.forEach(note => {
            store.dispatch(addNote(note));
        });
    });

// var loadNotes = function () {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', '/notes', 'true');
//     xhr.send();
//
//     xhr.onreadystatechange = function() {
//
//         if (xhr.readyState != 4) return;
//
//         if (xhr.status != 200) {
//             return;
//         } else {
//             var data = JSON.parse(xhr.responseText);
//             notes = data.notes;
//
//             //Рисуем
//             showNotes(data.notes);
//
//             //Весим обработчики
//             addHandlers();
//         }
//     }
// };
//
// var createElement = function (tag, classList, textContent, parent) {
//     var node = document.createElement(tag);
//     for (var i = 0; i < classList.length; i++) {
//         node.classList.add(classList[i]);
//     }
//     if (textContent) {
//         node.textContent = textContent;
//     }
//     if (parent) {
//         parent.appendChild(node);
//     }
//     return node;
// };
//
// var showNotes = function(notes) {
//     // Зачистка
//     var currentNotes = document.querySelectorAll('.row');
//     for (var i = 0; i < currentNotes.length; i++) {
//         currentNotes[i].parentNode.removeChild(currentNotes[i]);
//     }
//
//     var container = document.querySelector('.container');
//     for (var i = 0; i < notes.length; i++) {
//         var row = createElement('div', ['row'], false, container);
//         var note = createElement('div', ['note'], notes[i], row);
//     }
//     // Кнопка добавить
//     var row = createElement('div', ['row'], false, container);
//     row.appendChild(addButton);
// };
//
// var doActionNode = function (method, text, newText) {
//     if (!text) {
//         loadNotes();
//         return;
//     }
//     var xhr = new XMLHttpRequest();
//     var json;
//     switch (method) {
//         case 'change':
//             json = JSON.stringify({
//                 oldText: text,
//                 newText: newText
//             });
//             method = 'POST';
//             break;
//         case 'add':
//             json = JSON.stringify({
//                 text: text
//             });
//             method = 'PUT';
//             break;
//         case 'remove':
//             makeUnDeletable();
//             json = JSON.stringify({
//                 text: text
//             });
//             method = 'DELETE';
//             break;
//         default:
//             return;
//     }
//     xhr.open(method, '/notes', 'true');
//     xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//     xhr.send(json);
//
//     xhr.onreadystatechange = function() {
//
//         if (xhr.readyState != 4) return;
//
//         if (xhr.status != 200) {
//             return;
//         } else {
//             // Перезагружаем записи
//             loadNotes();
//         }
//
//     }
// };
//
// var notes;
// var noteNodes;
// var initialPoint;
// var finalPoint;
// var initialNode;
// var noteToDelete;
// var start;
// var noteText;
// var deleteDiv = createElement('div', ['trash'], 'Удалить');
// deleteDiv.addEventListener('click', function (event) {
//     doActionNode('remove', this.parentNode.childNodes[0].textContent);
// });
// var addButton = createElement('div', ['button-add'], 'Добавить');
// addButton.addEventListener('click', function (event) {
//     makeForm(this, 'add');
// });
//
// var addHandlers = function () {
//     noteNodes = document.querySelectorAll('.note');
//
//     document.addEventListener('touchstart', function (event) {
//         //event.preventDefault();
//         //event.stopPropagation();
//         initialPoint = event.changedTouches[0];
//         initialNode = event.target;
//         start = new Date();
//     }, false);
//
//     document.addEventListener('touchend', function (event) {
//         //event.preventDefault();
//         //event.stopPropagation();
//         finalPoint = event.changedTouches[0];
//         var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
//         var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
//         if (xAbs > 20 || yAbs > 20) {
//             if (xAbs > yAbs) {
//                 if (finalPoint.pageX < initialPoint.pageX){
//                     if (isIn(initialNode, noteNodes)) {
//                         makeDeletable(initialNode);
//                     }
//                 }
//                 else{
//                     if (initialNode === noteToDelete) {
//                         makeUnDeletable();
//                     }
//                 }
//             }
//         } else {
//             var finish = new Date();
//             if (finish.getTime() - start.getTime() < 200) {
//                 if (isIn(initialNode, noteNodes)) {
//                     // Создаем  новую
//                     makeForm(initialNode, 'change');
//                 }
//             }
//         }
//     }, false);
// };
//
// var isIn = function (obj, list) {
//     for (var i = 0; i < list.length; i++) {
//         if (obj === list[i]) return true;
//     }
//     return false;
// };
//
// var makeUnDeletable = function () {
//     var trashDiv = document.querySelector('.trash');
//     trashDiv.parentNode.removeChild(trashDiv);
//     noteToDelete.classList.remove('note_for-delete');
//     noteToDelete.classList.add('note');
//     noteToDelete = null;
//     // Обновляем массивчик с нетронутыми записями
//     noteNodes = document.querySelectorAll('.note');
// };
//
// var makeDeletable = function (node) {
//     if (noteToDelete) {
//         makeUnDeletable();
//     }
//     noteToDelete = node;
//     node.classList.remove('note');
//     node.classList.add('note_for-delete');
//     node.parentNode.appendChild(deleteDiv);
//     // Обновляем массивчик с нетронутыми записями
//     noteNodes = document.querySelectorAll('.note');
// };
//
// var makeForm = function (node, method) {
//     // Зачитска
//     removeForm();
//
//     noteText = node.textContent.trim();
//     var form = createElement('form', ['change-form'], false, node.parentNode);
//     form.action = '/changeNote';
//     form.method = 'post';
//     var textarea = createElement('textarea', [], false, form);
//     var buttonText;
//     if (method === 'change') {
//         buttonText = 'Изменить';
//         textarea.value = noteText;
//     } else {
//         buttonText = 'Добавить';
//         textarea.placeholder = 'Введите текст...';
//     }
//     var button = createElement('button', ['form-button_submit'], buttonText,  form);
//     button.type = 'submit';
//     node.parentNode.removeChild(node);
//     button.addEventListener('click', function (event) {
//         event.preventDefault();
//         var row = this.parentNode.parentNode;
//         if (method === 'change') {
//             doActionNode('change', noteText, textarea.value);
//         } else {
//             doActionNode('add', textarea.value);
//         }
//     }, false);
//     // Обновляем массивчик с нетронутыми записями
//     noteNodes = document.querySelectorAll('.note');
// };
//
// var removeForm = function () {
//     var form = document.querySelector('form');
//     if (!form) {
//         return;
//     }
//     var node;
//     var btnADD = document.querySelector('.button-add');
//     if (btnADD) {
//         node = createElement('div', ['note'], form.childNodes[0].value, form.parentNode)
//     } else {
//         form.parentNode.appendChild(addButton);
//     }
//     form.parentNode.removeChild(form);
//     // Обновляем массивчик с нетронутыми записями
//     noteNodes = document.querySelectorAll('.note');
// };
//
// loadNotes();

