'use strict';

var container = document.querySelector('.container');
var del = document.querySelector('.delete');
var formAdd = document.querySelector('.add');
var reload = document.querySelector('.reload');
var countMove = 0;

var target;
var lastEvent;

var formSave;
var noteSave;
var delItem;

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

function createNote(text) {
    var item = document.createElement('div');
    item.setAttribute('class', 'container__item');

    var p = document.createElement('p');
    p.setAttribute('class', 'container__item__text');
    p.innerText = text;

    item.appendChild(p);
    container.appendChild(item);
}

function resetFormSave() {
    noteSave.removeChild(formSave);
    noteSave.childNodes[0].style.display = 'inline';
    formSave = undefined;
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

function createFormSave(note, noteText) {
    var form = document.createElement('form');
    var inputText = document.createElement('input');
    var inputBtn = document.createElement('input');
    formSave = form;
    noteSave = note;

    form.setAttribute('method', 'post');
    form.setAttribute('action', '/change-note');
    form.setAttribute('class', 'save');

    inputText.setAttribute('value', noteText);
    inputText.setAttribute('type', 'text');
    inputText.setAttribute('class', 'save__text');

    inputBtn.setAttribute('type', 'submit');
    inputBtn.setAttribute('value', 'Save');
    inputBtn.setAttribute('class', 'save__btn');

    note.appendChild(form);
    form.appendChild(inputText);
    form.appendChild(inputBtn);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var text = document.querySelector('.save__text').value;
        var name = noteSave.childNodes[0].innerText;
        var body = 'name=' + encodeURIComponent(name) + '&changeNote=' + encodeURIComponent(text);

        xhrRequest('PUT', '/change-note', function (response) {
            noteSave.childNodes[0].innerText = response.name;
            resetFormSave();
        }, body);
    }, false);
}

function createDel() {
    del.style.display = 'block';
    del.style.top = target.offsetTop + 'px';
    del.style.left = target.offsetWidth * 0.8 + target.offsetLeft + 'px';
    del.style.height = target.offsetHeight + 'px';
}

function swipe(xAbs, yAbs) {
    if (xAbs > yAbs) {
        //Свайп влево
        if (finalPoint.pageX < initialPoint.pageX && finalPoint.target.closest('.container__item')){
            target = finalPoint.target.closest('.container__item');
            target.style.transform = 'translateX(-' + 20 + '%)';
            createDel();
        }
    } else {
        if (finalPoint.pageY > initialPoint.pageY && finalPoint.target.closest('header')){
            //Свайп вниз
            event.preventDefault();
            document.body.style.marginTop = 0;
            //get notes
            xhrRequest('GET', '/list-notes', function (response) {
                setTimeout(function () {
                    document.body.style.marginTop = -40 + 'px';
                }, 500);

                var items = document.querySelectorAll('.container__item');

                var i = 0;
                for (i; i < items.length; i++) {
                    container.removeChild(items[i]);
                }

                response.forEach(function (note) {
                    createNote(note.name);
                });
            });
        }
    }
}

formAdd.addEventListener('submit', function (event) {
    event.preventDefault();

    var note = document.querySelector('#input_text').value;
    if (!note) {
        return;
    }
    var body = 'name=' + encodeURIComponent(note);

    xhrRequest('POST', '/add-note', function (response) {
        createNote(response.name);
        document.querySelector('#input_text').value = '';
    }, body);
});

del.addEventListener('touchstart', function (event) {
    event.preventDefault();

    var name = target.childNodes[0].innerText;
    var body = 'name=' + encodeURIComponent(name);

    xhrRequest('DELETE', 'delete-note', function() {
        container.removeChild(target);
        resetDel();
    }, body);

    event.stopPropagation();
}, false);


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


        if (!touch.target.closest('.save') && formSave) {
            resetFormSave();
        }

        if (touch.target.closest('.delete')) {
            return;
        }

        if (target) {
            resetDel();
            resetTransform();
        }

        target = touch.target;

        touchOffsetX = touch.pageX;
        //touchOffsetY = touch.pageY;

        lastEvent = 'touchstart';
    }
}, false);


container.addEventListener('touchmove', function (event) {
    if (formSave) {
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

        item.style.transform = "translateX(" + (touch.pageX - touchOffsetX) + "px)";

        lastEvent = 'touchmove';
        event.stopPropagation();
    }

    countMove += 1;
}, false);

container.addEventListener('touchend', function (event) {
    if (event.changedTouches.length == 1 && lastEvent === 'touchstart') {
        //
        //if (!target.closest('.save') && formSave) {
        //    resetFormSave();
        //}

        if (target.className !== 'container__item' &&
            target.className !== 'container__item__text') {
            return;
        }

        var note;
        var text;
        if (target.className === 'container__item') {
            note = target;
            text = target.childNodes[0];
        } else {
            note = target.parentNode;
            text = target;
        }

        createFormSave(note, text.innerText);
        text.style.display = 'none';

        event.stopPropagation();
        countMove = 0;
    }

}, false);

document.addEventListener('touchend', function (event) {
    finalPoint = event.changedTouches[0];

    resetTransform();

    if (finalPoint.target.closest('.container__del') || formSave) {
        return;
    }
    resetDel();

    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 50 || yAbs > 50) {
        swipe(xAbs, yAbs);
    }
}, false);
