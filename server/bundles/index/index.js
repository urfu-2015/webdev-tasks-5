'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

import Wrapper from '../../../client/blocks/main';
import Item from '../../../client/blocks/item';
import {getNotes, addNote, deleteNote, callSaveForm, changeNote, changeOrder} from '../../../client/actions';
import {noteApp} from '../../../client/reducer';

const store = createStore(noteApp);

var wrapper = document.querySelector('.wrapper');
var formAdd = document.querySelector('.add');
var del = document.querySelector('.delete');
var saveItem;
var textSaveItem;

var countMove = 0;

var divsNotes = [];
var order = 0;
var currentOrder;
var stack = [];
var intervalDivsNotes;

var delItem;

var direction = 'x';

var target;
var lastEvent;

function xhrRequest(method, puth, hundler, body) {
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

function createDel() {
    del.style.display = 'block';
    del.style.top = target.offsetTop + 'px';
    del.style.left = target.offsetWidth * 0.8 + target.offsetLeft + 'px';
    del.style.height = target.offsetHeight + 'px';
}

function resetDel() {
    del.style.display = 'none';
    del.style.top = 0;
    del.style.left = 0;
}

function resetTransform() {
    if (target && target.closest('.container__item')) {
        target.closest('.container__item').style.transform = 'translateX(' + 0 + ')';
    }
}

function replace() {
    if (target.closest('.container__item') && !saveItem) {
        container = document.querySelector('.container');
        direction = 'y';
        divsNotes = [...container.childNodes];
        if (divsNotes.length > 1) {
            intervalDivsNotes = divsNotes[0].offsetTop - divsNotes[1].offsetTop;
        }
        target = target.closest('.container__item');
        target.style.transform = 'translateZ(100px) scale(1.1)';
        currentOrder = divsNotes.indexOf(target);
        stack.push(target);
    }
}

function shift(touch) {
    if (currentOrder > 0) {
        if (condition(touch, -1)) {
            stepOfShift(-1);
        }
    }

    if (currentOrder < divsNotes.length - 1) {
        if (condition(touch, 1)) {
            stepOfShift(1);
        }
    }
}

function condition(touch, step) {
    if (stack.indexOf(divsNotes[currentOrder + step]) > - 1) {
        return touch.pageY < stack[stack.length - 2].offsetTop + stack[stack.length - 2].offsetHeight / 2 &&
            touch.pageY > stack[stack.length - 2].offsetTop;
    }
    return touch.pageY < divsNotes[currentOrder + step].offsetTop + divsNotes[currentOrder + step].offsetHeight / 2 &&
        touch.pageY > divsNotes[currentOrder + step].offsetTop;
}

function stepOfShift(step) {
    if (stack.indexOf(divsNotes[currentOrder + step]) > -1) {
        stack.pop().style.transform = "translateY(" + 0 + "px)";
    } else {
        stack.push(divsNotes[currentOrder + step]);
        divsNotes[currentOrder + step].style.transform = "translateY(" + (step * intervalDivsNotes) + "px)";
    }
    currentOrder += step;
}

function swipe(xAbs, yAbs, event) {
    if (xAbs > yAbs) {
        //Свайп влево
        if (finalPoint.pageX < initialPoint.pageX && finalPoint.target.closest('.container__item')
            && direction === 'x') {
            target = finalPoint.target.closest('.container__item');
            target.style.transform = 'translateX(-' + 20 + '%)';
            createDel();
        }
    } else {
        if (finalPoint.pageY > initialPoint.pageY && finalPoint.pageY < document.documentElement.clientHeight) {
            //Свайп вниз
            event.preventDefault();
            document.body.style.marginTop = 0;
            xhrRequest('GET', '/list-notes', function (response) {
                setTimeout(function () {
                    document.body.style.marginTop = -40 + 'px';
                }, 500);

                render(response);
            });
        }
    }
}

function compare(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }

    var i = 0;
    for (i; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
}

function render() {
    ReactDom.render(
        <Wrapper store={store} />,
        wrapper
    );
}

function init() {
    xhrRequest('GET', '/list-notes', (response) => {
        var names = response.map((note) => {
            return note.name;
        });

        var action = getNotes(names);
        store.dispatch(action);
    });
}

init();
store.subscribe(render);

var container = document.querySelector('.container');

formAdd.addEventListener('submit', (event) => {
    event.preventDefault();

    var note = document.querySelector('#input_text').value;
    if (!note) {
        return;
    }

    var body = 'name=' + encodeURIComponent(note);

    xhrRequest('POST', '/add-note', function (response) {
        var action = addNote(response.name);
        store.dispatch(action);

        document.querySelector('#input_text').value = '';
        window.scrollTo(0, 0);
    }, body);
}, false);

del.addEventListener('touchstart', function (event) {
    event.preventDefault();

    var name = target.childNodes[0].innerText;
    var body = 'name=' + encodeURIComponent(name);

    xhrRequest('DELETE', 'delete-note', function(response) {
        var action = deleteNote(response.name);
        store.dispatch(action);

        resetDel();
    }, body);

    event.stopPropagation();
}, false);

document.addEventListener('submit', event => {
    if (!event.target.closest('.save')) {
        return;
    }
    event.preventDefault();

    var text = document.querySelector('.save__text').value;
    if (text === textSaveItem) {
        return;
    }

    var body = 'name=' + encodeURIComponent(textSaveItem) + '&changeNote=' + encodeURIComponent(text);

    xhrRequest('PUT', '/change-note', function (response) {
        var action = changeNote(textSaveItem, response.name);
        store.dispatch(action);
    }, body);
}, false);

var longTouch;

var touchOffsetX;
var touchOffsetY;

var initialPoint;
var finalPoint;

var lastX;
var lastY;


document.addEventListener('touchstart', function (event) {
    if (event.targetTouches.length === 1) {
        initialPoint = event.changedTouches[0];
        var touch = event.targetTouches[0];

        if (!touch.target.closest('.save') && saveItem) {
            var action = callSaveForm(textSaveItem, false);
            store.dispatch(action);
            saveItem = undefined;
        }

        if (touch.target.closest('.delete')) {
            return;
        }

        if (target) {
            resetDel();
            resetTransform();
        }

        target = touch.target;

        longTouch = setTimeout(replace, 300);

        touchOffsetX = touch.pageX;
        touchOffsetY = touch.pageY;

        lastEvent = 'touchstart';
    }
}, false);

wrapper.addEventListener('touchmove', function (event) {
    if (saveItem) {
        return;
    }

    if (event.targetTouches.length == 1 && countMove > 5) {
        var touch = event.targetTouches[0];
        var touchTarget = touch.target;

        var item = touchTarget.closest('.container__item');

        if (!item) {
            return;
        }
        event.preventDefault();

        if (direction === 'x') {
            item.style.transform = "translateX(" + (touch.pageX - touchOffsetX) + "px)";
            event.stopPropagation();
        } else {
            event.stopPropagation();
            item.style.transform = "translateY(" + (touch.pageY - touchOffsetY) + "px) " + "scale(1.1) translateZ(100px)";
            shift(touch);
        }

        lastEvent = 'touchmove';
        clearTimeout(longTouch);
    }

    countMove += 1;
}, false);

document.addEventListener('touchend', function (event) {
    if (event.changedTouches.length == 1 && lastEvent === 'touchstart') {

        if (target.className !== 'container__item' &&
            target.className !== 'container__item__text') {
            return;
        }

        if (target.className === 'container__item') {
            saveItem = target;
            textSaveItem = target.childNodes[0].innerHTML;
        } else {
            saveItem = target.parentNode;
            textSaveItem = target.innerHTML;
        }

        if (direction === 'x') {
            var action = callSaveForm(textSaveItem, true);
            store.dispatch(action);
        }

        event.stopPropagation();
        countMove = 0;
    }
}, false);

document.addEventListener('touchend', function (event) {
    finalPoint = event.changedTouches[0];
    clearTimeout(longTouch);

    resetTransform();

    if (finalPoint.target.closest('.container__del') || saveItem) {
        return;
    }
    resetDel();

    if (direction == 'y') {
        if (stack.length === 1) {
            return;
        }

        var stringStack = stack.map(item => {
            return item.childNodes[0].innerHTML;
        });

        var action = changeOrder(stringStack);
        store.dispatch(action);

        stack = [];
        direction = 'x';

        var body = '';
        var i = 0;
        divsNotes.forEach(function (name) {
            name.style.transform = 'translateY(0)';
            if (i === 0) {
                body += 'name_' + i + "=" + encodeURIComponent(name.childNodes[0].innerHTML);
            } else {
                body += '&name_' + i + "=" + encodeURIComponent(name.childNodes[0].innerHTML);
            }

            i ++;
        });
        xhrRequest('PUT', '/change-chain', function (response) {
            if (compare(store.getState().notes, response)) {
                action = getNotes(response);
                store.dispatch(action);
            }
        }, body);
        return;
    }

    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 50 || yAbs > 50) {
        swipe(xAbs, yAbs, event);
    }
}, false);
