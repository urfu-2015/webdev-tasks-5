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
                div.className = "c3";
                div.innerHTML = result[i];
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
    div_top.addEventListener('touchstart', function(event) {
        //event.preventDefault();
        event.stopPropagation();
        startPoint.x=event.changedTouches[0].pageX;
        startPoint.y=event.changedTouches[0].pageY;
        ldelay=new Date();
    }, false);
    /*Ловим движение пальцем*/
    div_top.addEventListener('touchmove', function(event) {
        //event.preventDefault();
        event.stopPropagation();
        var otk={};
        nowPoint=event.changedTouches[0];
        otk.x=nowPoint.pageX-startPoint.x;
        /*Обработайте данные*/
        /*Для примера*/
        if(Math.abs(otk.x)>200){
            if(otk.x<0){/*СВАЙП ВЛЕВО(ПРЕД.СТРАНИЦА)*/
            }
            if(otk.x>0){/*СВАЙП ВПРАВО(СЛЕД.СТРАНИЦА)*/}
            startPoint={x:nowPoint.pageX,y:nowPoint.pageY};
        }
    }, false);
    /*Ловим отпускание пальца*/
    div_top.addEventListener('touchend', function(event) {
        var pdelay=new Date();
        nowPoint=event.changedTouches[0];
        var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
        var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
        if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime()-ldelay.getTime())<200) {
            if (xAbs > yAbs) {
                if (nowPoint.pageX < startPoint.x){/*СВАЙП ВЛЕВО*/alert("swipe :)");}
                else{/*СВАЙП ВПРАВО*/}
            }
            else {
                if (nowPoint.pageY < startPoint.y){/*СВАЙП ВВЕРХ*/}
                else{/*СВАЙП ВНИЗ*/}
            }
        }
    }, false);
}