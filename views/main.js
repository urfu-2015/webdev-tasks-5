function getListTodo() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/list-todo', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            var reload = document.getElementsByClassName('reloader')[0];
            reload.innerHTML = "";
            var container = document.getElementsByClassName('container')[0];
            container.innerHTML = '<div class="container-flex">' +
                '<div class="blue-list-item">' +
                'TODO-хи' +
                '</div>' +
                '</div>';
            var result = JSON.parse(xhr.responseText);
            for (var i=0;i<result.length;i++) {
                var div = document.createElement('div');
                div.className = "container-flex";
                div.setAttribute('id', 'cont' + i);
                div.innerHTML = "<div id='list"+ i + "'class='bluelight-list-item'>" + result[i] + "</div>";
                container.appendChild(div);
            }
        }
    }
}
function deleteElement(id) {
    var xhr = new XMLHttpRequest();
    var body = 'name=' + encodeURIComponent(id);
    xhr.open('DELETE', '/list-delete', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
                getListTodo();
            }
        }
}
function addElement(content) {
    var xhr = new XMLHttpRequest();
    var body = 'content=' + encodeURIComponent(content);
    xhr.open('PUT', '/list-add', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            getListTodo();
        }
    }
}
function changeElement(id, content) {
    var xhr = new XMLHttpRequest();
    var body = 'content=' + encodeURIComponent(content) +
    '&id=' + encodeURIComponent(id);
    xhr.open('POST', '/list-change', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            getListTodo();
        }
    }
}
function getById(id) {
    // возвращает элемент из document с данным id
    return document.getElementById(id);
}
function createChangeForm(id, value) {
    return '<form class="changeForm" action="/list-change" method="POST">' +
        '<input id="input-change-text-' + id +
        '" type="text" style="resize: none;" value="' + value + '">' +
        '<input id="submit-change-btn-' + id +
        '" type="submit" class="submit-change-btn" value="Изменить"></form>';
}
function getClassByNumber(className, number) {
    return document.getElementsByClassName(className)[number];
}
function createReloadDiv() {
    return '<div class="container-flex">' +
    '<div class="reload-image">' +
    '<img src="reload.png" class="image-reload">' +
    '</div>' +
    '</div>';
}

function checkEvents() {
    var startPoint={}; // начальная точка тача
    var nowPoint; // текущая точка тача
    var startTime; // время начала тача
    getById('submit-btn').addEventListener('click', function (event) {
        event.preventDefault();
        addElement(getById('input-text').value);
    });
    document.addEventListener('touchstart', function(event) {
        event.stopPropagation();
        startPoint.x = event.changedTouches[0].pageX;
        startPoint.y = event.changedTouches[0].pageY;
        startTime = new Date();
        if (event.targetTouches.length == 1) {
            // одиночный тач (по картинке корзины) - удаление
            var clickedElem = document.elementFromPoint(startPoint.x - window.pageXOffset, startPoint.y - window.pageYOffset);
            var idClickedElem = clickedElem.getAttribute('id');
            var idType = idClickedElem.substr(0, 3);
            if (idType == 'img' || idType == 'del') { // если тач по картинке или по блоку с картинкой
                var numberId = idClickedElem.slice(-1 * idClickedElem.length + 3); // берем все после первых 3 цифр
                deleteElement(numberId);
            }
        }
    }, false);
    document.addEventListener('touchend', function(event) {
        event.stopPropagation();
        var shift = {}; // смещение после тача
        nowPoint = event.changedTouches[0];
        shift.x = nowPoint.pageX - startPoint.x;
        shift.y = nowPoint.pageY - startPoint.y;
        var clickedElem = event.target;
        // Если был ШортТач
        var endTime=new Date();
        if(event.changedTouches[0].pageX == startPoint.x &&
            event.changedTouches[0].pageY == startPoint.y &&
            (endTime.getTime()-startTime.getTime()) > 20) { // тач на месте - предлагаем изменить блок
            if (!getClassByNumber('changeForm', 0)) { // если еще не вставляли
                var listItem = clickedElem.getAttribute('id').slice(4); // берем номер блока
                clickedElem.innerHTML = createChangeForm(listItem, clickedElem.innerText);
                getById('submit-change-btn-' + listItem).addEventListener('click', function (event) {
                    event.preventDefault();
                    changeElement(listItem, getById('input-change-text-' + listItem).value);
                });
            }
        }
        // Если свайп сверху вниз, обновляем страничку
        if(nowPoint.pageY > startPoint.y + 50) {
            var containerReloader = getClassByNumber('reloader', 0); // берем блок .reloader
            var div = document.createElement('div');
            div.className = 'container-reload';
            div.innerHTML = createReloadDiv();
            containerReloader.appendChild(div);
            setTimeout(getListTodo, 500);
        }
        // Если свайп влево, показываем картинку удаления
        if(Math.abs(shift.x) > 20) {
            var listNumber = clickedElem.getAttribute('id').slice(4);
            if(shift.x < 0 && Math.abs(shift.y) < 50){
                var div = document.createElement('div');
                div.className = "delete";
                div.setAttribute('id', 'del' + listNumber);
                div.innerHTML = "<img id='img" + listNumber + "' src='trash.png' class='image-delete'>" + "</a>";
                var container = getById('list' + listNumber);
                getById('cont' + listNumber).appendChild(div);

                container = getById('list' + listNumber);
                container.style.marginLeft = "0px";
                container.style.marginRight = "0px";
            }
            // Если свайп вправо, закрываем картинку
            if(shift.x > 0 && Math.abs(shift.y) < 50)
            {
                var container = getById('cont' + listNumber);
                container.removeChild(getById('del' + listNumber));

                container = getById('list' + listNumber);
                container.style.marginLeft = "30px";
                container.style.marginRight = "30px";
            }
            startPoint = {
                x:nowPoint.pageX,
                y:nowPoint.pageY
            };
        }
    }, false);
}