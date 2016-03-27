function getListTodo() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/list-todo', true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            // вывести результат
            var container = document.getElementsByClassName('container')[0];
            container.innerHTML = '<div class="header-cont">' +
                '<div class="c2">' +
                'TODO-хи' +
                '</div>' +
                '</div>';
            var result = JSON.parse(xhr.responseText);
            for (var i=0;i<result.length;i++) {
                var div = document.createElement('div');
                div.className = "header-cont";
                div.setAttribute('id', 'cont' + i);
                div.innerHTML = "<div id='list"+ i + "'class='c3'>" + result[i] + "</div>";
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
            // обработать ошибку
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
                console.log(xhr.responseText);
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
            // обработать ошибку
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
            // обработать ошибку
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            getListTodo();
        }
    }
}
function swipe() {
    var startPoint={};
    var nowPoint;
    var ldelay;
    document.getElementById('submit-btn').addEventListener('click', function (event) {
        event.preventDefault();
        addElement(document.getElementById('input-text').value);
    });
    document.addEventListener('touchstart', function(event) {
        event.stopPropagation();
        if (event.targetTouches.length == 1) {
            var startTap = {};
            startTap.x=event.changedTouches[0].pageX;
            startTap.y=event.changedTouches[0].pageY;
            /* Надо удалить если нажали на картинку с нужным id */
            var elem = document.elementFromPoint(startTap.x - window.pageXOffset, startTap.y - window.pageYOffset);
            var fullElemId = elem.getAttribute('id');
            var elemId = elem.getAttribute('id').substr(0, 3);
            if (elemId == 'img' || elemId == 'del') {
                var numberId = fullElemId.slice(-1 * fullElemId.length + 3);
                deleteElement(parseInt(numberId));
            }
        }
        startPoint.x=event.changedTouches[0].pageX;
        startPoint.y=event.changedTouches[0].pageY;
        ldelay=new Date();
    }, false);
    /*Ловим движение пальцем*/
    document.addEventListener('touchend', function(event) {
        event.stopPropagation();
        var otk={};
        nowPoint=event.changedTouches[0];
        otk.x=nowPoint.pageX-startPoint.x;
        // Если был ШортТач
        var pdelay=new Date();
        if(event.changedTouches[0].pageX==startPoint.x &&
            event.changedTouches[0].pageY==startPoint.y &&
            (pdelay.getTime()-ldelay.getTime())>100) {
            // надо добавить форму в штуку, по которой я кликнул
            var elem = document.elementFromPoint(startPoint.x - window.pageXOffset, startPoint.y - window.pageYOffset);
            var listItem = elem.getAttribute('id').slice(4);
            var div = document.createElement('div');
            elem.innerHTML = '<form action="/list-change" method="POST">' +
                '<input id="input-change-text-' + listItem +'" type="text" style="resize: none;" value="' + elem.innerText + '">' +
                '<input id="submit-change-btn-' + listItem + '" type="submit" value="Изменить" style="margin-left: 10px;">' +
                '</form>';
            document.getElementById('submit-change-btn-' + listItem).addEventListener('click', function (event) {
                event.preventDefault();
                changeElement(listItem, document.getElementById('input-change-text-' + listItem).value);
            });
        }
        /*Обработайте данные*/
        /*Для примера*/
        if(Math.abs(otk.x)>20){
            var elem = document.elementFromPoint(startPoint.x - window.pageXOffset, startPoint.y - window.pageYOffset);
            var listNumber = elem.getAttribute('id').slice(4);
            if(otk.x < 0){/*СВАЙП ВЛЕВО(ПРЕД.СТРАНИЦА)*/
                // надо добавить блок еще к моему
                var div = document.createElement('div');
                console.log(listNumber);
                div.className = "delete";
                div.setAttribute('id', 'del' + listNumber);
                div.innerHTML = "<img id='img" + listNumber + "' src='trash.png' style='max-height:50px;'>" + "</a>";
                var container = document.getElementById('list' + listNumber);
                document.getElementById('cont' + listNumber).appendChild(div);
                container = document.getElementById('list' + listNumber);
                container.style.marginLeft = "0px";
                container.style.marginRight = "0px";
                //if (nowPoint.pageY < 150) {
                //    var div = document.createElement('div');
                //    div.className = "delete";
                //    div.innerHTML = "<img id='" + listNumber + "' src='trash.png' style='max-height:50px;'>" + "</a>";
                //    var container = document.getElementsByClassName('c2')[0];
                //    document.getElementsByClassName('header-cont')[0].appendChild(div);
                //    container.style.marginLeft = "0px";
                //    container.style.marginRight = "0px";
                //}
            }
            if(otk.x>0)
            {
                var container = document.getElementById('cont' + listNumber);
                container.removeChild(document.getElementById('del' + listNumber));
                container = document.getElementById('list' + listNumber);
                container.style.marginLeft = "30px";
                container.style.marginRight = "30px";
            }
            startPoint={x:nowPoint.pageX,y:nowPoint.pageY};
        }
    }, false);
}