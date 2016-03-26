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
            var result = JSON.parse(xhr.responseText);
            for (var i=0;i<result.length;i++) {
                var div = document.createElement('div');
                div.className = "header-cont";
                div.innerHTML = "<div class='c2'>" + result[i] + "</div>";
                container.appendChild(div);
            }
        }
    }
}
function swipe() {
    var startPoint={};
    var nowPoint;
    var ldelay;
    var div_top = document.getElementsByClassName('c2')[0];
    document.addEventListener('touchstart', function(event) {
        //event.preventDefault();
        event.stopPropagation();
        startPoint.x=event.changedTouches[0].pageX;
        startPoint.y=event.changedTouches[0].pageY;
        ldelay=new Date();
    }, false);
    /*Ловим движение пальцем*/
    document.addEventListener('touchend', function(event) {
        //event.preventDefault();
        event.stopPropagation();
        var otk={};
        nowPoint=event.changedTouches[0];
        otk.x=nowPoint.pageX-startPoint.x;
        /*Обработайте данные*/
        /*Для примера*/
        if(Math.abs(otk.x)>20){
            if(otk.x < 0){/*СВАЙП ВЛЕВО(ПРЕД.СТРАНИЦА)*/
                // надо добавить блок еще к моему
                var listNumber = parseInt(nowPoint.pageY / 150);
                var elem = document.elementFromPoint(startPoint.x, startPoint.y);
                console.log(elem);
                if (nowPoint.pageY < 150) {
                    var div = document.createElement('div');
                    div.className = "delete";
                    div.innerHTML = "<img id='" + listNumber + "' src='trash.png' style='max-height:50px;'>" + "</a>";
                    var container = document.getElementsByClassName('c2')[0];
                    document.getElementsByClassName('header-cont')[0].appendChild(div);
                    container.style.marginLeft = "0px";
                    container.style.marginRight = "0px";
                }
                if (nowPoint.pageY > 160 && nowPoint.pageY < 210) {
                    alert("here2");
                }
                if (nowPoint.pageY > 220 && nowPoint.pageY < 370) {
                    alert("here3");
                }
            }
            if(otk.x>0){if (nowPoint.pageY < 150) {

                var container = document.getElementsByClassName('header-cont')[0];
                container.removeChild(document.getElementsByClassName('delete')[0]);
                container = document.getElementsByClassName('c2')[0];
                container.style.marginLeft = "30px";
                container.style.marginRight = "30px";
            }
            }
            startPoint={x:nowPoint.pageX,y:nowPoint.pageY};
        }
    }, false);
}