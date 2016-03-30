/**
 * Created by Надежда on 30.03.2016.
 */

var newRemark = document.querySelector('.new-remark');

//нажали на кнопку создания новой заметки
newRemark.addEventListener('click', function (event){
    event.preventDefault();
    document.querySelector('.creating').setAttribute('style', 'display: block;');
    newRemark.setAttribute('style', 'display: none;');
});

//отмена создания
document.querySelector('.redo-form_cancel').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.creating').setAttribute('style', 'display: none;');
    newRemark.setAttribute('style', 'display: block;');
});

//а что дальше! слабонервным не смотреть
//отправка заметки и ее сохрание
document.querySelector('.redo-form_send').addEventListener('click', function (event) {
    event.preventDefault();
    var text = document.querySelector('textarea.redo-form_text').value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/remarks/new', true);
    xhr.onreadystatechange = function() { // (3)
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var main = document.querySelector('.main');
            var card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = text;
            var id = JSON.parse(xhr.responseText).id;
            card.setAttribute('server_id', id);
            main.querySelector('.creating').setAttribute('style', 'display: none;');
            main.removeChild(newRemark);
            newRemark.setAttribute('style', 'display: block;');
            main.appendChild(card);
            main.appendChild(newRemark);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('text=' + encodeURIComponent(text));
});


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//tap - редактирование
var allCards = document.querySelectorAll('.card');
allCards = Array.prototype.slice.call(allCards);

//swipe
var startPoint={};
var nowPoint;
var startTime;
allCards.map(function(elem, index, array) {
    elem.addEventListener('touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        startTime = new Date();
    }, false);
    elem.addEventListener('touchmove', function(event) {
        event.preventDefault();
        event.stopPropagation();
        nowPoint = event.changedTouches[0];
        var dif = nowPoint.pageX-startPoint.x;

        if(Math.abs(dif) > 200){
            if(dif < 0) {
                var but = document.querySelector('.delButton');
                document.querySelector('.main').removeChild(but);
                insertAfter(but, elem);
                but.setAttribute('style', 'display: inline');
                elem.setAttribute('style', 'margin-left: -50px');
            }
            startPoint={x:nowPoint.pageX,y:nowPoint.pageY};
        }
    }, false);
    elem.addEventListener('touchend', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var endTime = new Date();
        nowPoint = event.changedTouches[0];
        var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
        var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
        if ((xAbs > 20 || yAbs > 20) && (endTime.getTime()-startTime.getTime())<200) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX) {
                    addDelete(elem);
                }
            }
        }  else {
            newRemark.setAttribute('style', 'display: none;');
            var myclick = event.targetTouches[0];
            var card = elem;
            var main = document.querySelector('.main');
            card.setAttribute('style', 'display:none;');
            var redo = document.querySelector('.redo');
            main.removeChild(redo);
            redo.setAttribute('style', 'display:block;');
            redo.querySelector('.redo_text').innerHTML = card.innerHTML;
            insertAfter(redo, card);
                //отмена
            document.querySelector('.redo_cancel').addEventListener('click', function (event) {
                event.preventDefault();
                document.querySelector('.redo').setAttribute('style', 'display: none;');
                card.setAttribute('style', 'display:block;');
            });
                //отправка изменения
            document.querySelector('.redo_send').addEventListener('click', function (event) {
                event.preventDefault();
                var text = document.querySelector('textarea.redo_text').value;
                console.log(text);
                var xhr = new XMLHttpRequest();
                xhr.open('PUT', '/remarks/' + index, true);
                xhr.onreadystatechange = function () { // (3)
                    if (xhr.readyState != 4) return;
                        if (xhr.status != 200) {
                            console.log(xhr.status + ': ' + xhr.statusText);
                        } else {
                            var main = document.querySelector('.main');
                            card.innerHTML = text;
                            card.setAttribute('style', 'display:block;');
                            main.querySelector('.redo').setAttribute('style', 'display: none;');
                            newRemark.setAttribute('style', 'display: block;');
                        }
                    };
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.send('text=' + encodeURIComponent(text));
                });
            }
    }, false);
});
