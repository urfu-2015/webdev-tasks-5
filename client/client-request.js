'use strict';

import {getNotes, addNote, changeNote, deleteNote} from './actions';
import {resetTransform} from './actions/transforms';

function xhrRequest (method, puth, hundler, body) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, puth, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (body) {
        xhr.send(body);
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            hundler(JSON.parse(xhr.response));
        }
    }
}

export const update = (store, successHandler) => {
    xhrRequest('GET', '/list-notes', (response) => {
        var names = response.map((note) => {
            return note.name;
        });

        var action = getNotes(names);
        store.dispatch(action);

        if (successHandler) successHandler();
    });
};

export const updateOrder = (store) => {
    var body = '';
    var divsNotes = [...document.querySelectorAll('.container__item')];
    divsNotes.forEach(function (name) {
        resetTransform(name);
        body += '&name_' + divsNotes.indexOf(name) + "=" + encodeURIComponent(name.childNodes[0].innerHTML);
    });
    body = body.slice(1);

    xhrRequest('PUT', '/change-chain', function (response) {
        var action = getNotes(response);
        store.dispatch(action);
    }, body);
};

export const create = (store, note) => {
    var body = 'name=' + encodeURIComponent(note);

    xhrRequest('POST', '/add-note', (response) => {
        var action = addNote(response.name);
        store.dispatch(action);

        document.querySelector('#input_text').value = '';
        window.scrollTo(0, 0);
    }, body);
};

export const save = (textSaveItem, store) => {
    var text = document.querySelector('.save__text').value;
    if (text === textSaveItem && !text) {
        return;
    }

    var body = 'name=' + encodeURIComponent(textSaveItem) + '&changeNote=' + encodeURIComponent(text);

    xhrRequest('PUT', '/change-note', function (response) {
        var action = changeNote(textSaveItem, response.name);
        store.dispatch(action);
    }, body);
};

export const deleteItem = (target, successHandler) => {
    var name = target.childNodes[0].innerText;
    var body = 'name=' + encodeURIComponent(name);

    xhrRequest('DELETE', 'delete-note', (response) => {
        var action = deleteNote(response.name);
        store.dispatch(action);

        successHandler();
    }, body);
};
