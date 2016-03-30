'use strict';

var container = document.querySelector('.container');
var del = document.querySelector('.container__delete');
var formAdd = document.querySelector('.add');
var reload = document.querySelector('.reload');
var countMove = 0;

var target;
var lastEvent;

var formSave;
var noteSave;
var delItem;

function xhrRequest(method, puth, hundler, body) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, puth, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (body) {
        xhr.send(body);
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = () => {
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
    noteSave.childNodes[1].style.display = 'inline';
    formSave = undefined;
}

function resetDel() {
    target.style.transform = 'translateX(' + 0 + '%)';
    del.style.display = 'none';
}

function resetTransform() {
    console.log(target);
    target.style.transform = 'translateX(' + 0 + ')';
}

function createFormSave(note, noteText) {
    var form = document.createElement('form');
    var inputText = document.createElement('input');
    var inputBtn = document.createElement('button');
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

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        var text = document.querySelector('.save__text').value;
        var name = noteSave.childNodes[i].innerText;
        var body = 'name=' + encodeURIComponent(name) + '&change=' + encodeURIComponent(text);

        xhrRequest('PUT', '/change-note', (response) => {
            noteSave.childNodes[1].innerText = response.name;
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



formAdd.addEventListener('submit', event => {
    event.preventDefault();

    const note = document.querySelector('#input_text').value;
    if (!note) {
        return;
    }
    const body = 'name=' + encodeURIComponent(note);

    xhrRequest('POST', '/add-path', (response) => {
        createNote(response.name);
    }, body);
});

del.addEventListener('touchstart', (event) => {
    event.preventDefault();

    //console.log(target);
    var name = target.childNodes[1].innerText;
    var body = 'name=' + encodeURIComponent(name);

    xhrRequest('DELETE', 'delete-note', () => {
        del.style.display = 'none';
        container.removeChild(target);
    }, body);

    event.stopPropagation();
}, false);


var touchOffsetX;
var touchOffsetY;

var initialPoint;
var finalPoint;

var lastX;
var lastY;


document.body.addEventListener('touchstart', (event) => {
    console.log('touchstart');

    if (event.targetTouches.length === 1) {
        initialPoint = event.changedTouches[0];
        var touch = event.targetTouches[0];


        if (!touch.target.closest('.save') && formSave) {
            resetFormSave();
            return;
        }

        if (touch.target.closest('.container__delete')) {
            return;
        }

        if (target) {
            resetDel();
        }

        target = touch.target;

        touchOffsetX = touch.pageX;
        //touchOffsetY = touch.pageY;

        lastEvent = 'touchstart';
    }
}, false);


container.addEventListener('touchmove', (event) => {
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

container.addEventListener('touchend', (event) => {
    console.log('touchend');
    if (event.changedTouches.length == 1 && lastEvent === 'touchstart') {

        if (!target.closest('.save') && formSave) {
            resetFormSave();
        }


        if (target.className !== 'container__item' &&
            target.className !== 'container__item__text') {
            return;
        }

        var text = target.childNodes[1] || target;
        var note;
        if (target.className === 'container__item') {
            note = target;
        } else {
            note = target.parentNode;
        }

        createFormSave(note, text.innerText);
        text.style.display = 'none';

        event.stopPropagation();
        lastEvent = undefined;
        countMove = 0;
    }

}, false);

//container.addEventListener('touchend', (event) => {
    //console.log(lastEvent);
//    if (event.changedTouches.length == 1 && lastEvent === 'touchmove') {
//
//        console.log('touchmoveend');
//        var target = event.changedTouches[0].target;
//
//        if (!target.closest('.container__item')) {
//            return;
//        }
//
//        //event.preventDefault();
//        var item;
//        if (target.className === '.container__item__text') {
//            item = target.parentNode;
//        } else {
//            item = target;
//        }
//
//        var width = item.offsetWidth;
//        var height = item.offsetHeight;
//        var x = item.offsetLeft;
//        var y = item.offsetTop;
//        if(
//            (event.changedTouches[0].pageX > x) &&
//            (event.changedTouches[0].pageX < (x + width)) &&
//            (event.changedTouches[0].pageY > y) &&
//            (event.changedTouches[0].pageY < (y + height))){
//            /*Мы над объектом tarobj*/
//        }
//
//    }
//    touchOffsetX = undefined;
//    touchOffsetY = undefined;
//    lastEvent = undefined;
//}, false);


document.addEventListener('touchend', function(event) {
    event.preventDefault();
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    target = finalPoint.target.closest('.container__item');

    if (!target) {
        return;
    }

    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs > 50 || yAbs > 50) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX){
                target.style.transform = 'translateX(-' + 20 + '%)';
                createDel();
            }
            else{
                /*СВАЙП ВПРАВО*/}
        }
        else {
            if (finalPoint.pageY < initialPoint.pageY){
                /*СВАЙП ВВЕРХ*/}
            else{
                /*СВАЙП ВНИЗ*/
                event.preventDefault();
                document.body.style.marginTop = 0;
                //get notes
                xhrRequest('GET', '/list-notes', (response) => {
                    setTimeout(() => {
                        document.body.style.marginTop = -40 + 'px';
                    }, 500);

                    var items = document.querySelectorAll('.container__item');
                    items.forEach((item) => {
                        container.removeChild(item);
                    });

                    response.forEach((note) => {
                        createNote(note.name);
                    });

                    for (note in response) {
                        if (response.hasOwnProperty(note)) {
                            createNote(response[name].name)
                        }
                    }
                });
            }
        }
    } else {
        resetTransform();
    }
}, false);
