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
            container.innerHTML = '<div class="header-cont">' +
                '<div class="blue-container">' +
                'TODO-хи' +
                '</div>' +
                '</div>';
            var result = JSON.parse(xhr.responseText);
            for (var i=0;i<result.length;i++) {
                var div = document.createElement('div');
                div.className = "header-cont";
                div.setAttribute('id', 'cont' + i);
                div.innerHTML = "<div id='list"+ i + "'class='white-container'>" + result[i] + "</div>";
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
        startPoint.x=event.changedTouches[0].pageX;
        startPoint.y=event.changedTouches[0].pageY;
        ldelay=new Date();
        if (event.targetTouches.length == 1) {
            var elem = document.elementFromPoint(startPoint.x - window.pageXOffset, startPoint.y - window.pageYOffset);
            var fullElemId = elem.getAttribute('id');
            var elemId = elem.getAttribute('id').substr(0, 3);
            if (elemId == 'img' || elemId == 'del') {
                var numberId = fullElemId.slice(-1 * fullElemId.length + 3);
                deleteElement(parseInt(numberId));
            }
        }
    }, false);
    document.addEventListener('touchend', function(event) {
        event.stopPropagation();
        var otk={};
        nowPoint=event.changedTouches[0];
        otk.x=nowPoint.pageX-startPoint.x;
        otk.y=nowPoint.pageY-startPoint.y;
        // Если был ШортТач
        var pdelay=new Date();
        if(event.changedTouches[0].pageX==startPoint.x &&
            event.changedTouches[0].pageY==startPoint.y &&
            (pdelay.getTime()-ldelay.getTime())>100) {
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
        // Если свайп сверху вниз
        if(nowPoint.pageY > startPoint.y + 20){
            console.log("here");
            var container = document.getElementsByClassName('reloader')[0];
            var div = document.createElement('div');
            div.className = 'container-reload';
            div.innerHTML = '<div class="header-cont">' +
                '<div class="rld">' +
                '<img src="reload.png" style="max-height:50px;">' +
                '</div>' +
                '</div>';
            container.appendChild(div);
            setTimeout(getListTodo, 1000);
        }
        // Если свайп вправо
        if(Math.abs(otk.x)>20) {
            var elem = document.elementFromPoint(startPoint.x - window.pageXOffset, startPoint.y - window.pageYOffset);
            var listNumber = elem.getAttribute('id').slice(4);
            if(otk.x < 0 && Math.abs(otk.y) < 50){
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
            }
            // Если свайп влево
            if(otk.x>0 && Math.abs(otk.y) < 50)
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