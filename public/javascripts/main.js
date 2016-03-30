function request(type, url, date, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open(type, url, true);
    xmlhttp.onreadystatechange = callback;
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(date);
}
function close() {

}
function generate_input_edit(text) {
    var todo_input = document.createElement('input');
    todo_input.className = 'todo-list__item';
    todo_input.type = 'text';
    todo_input.name = 'todo';
    todo_input.value = text;
    todo_input.style = 'display: none';
    return todo_input;
}
function generate_div_todo(text) {
    var todo = document.createElement('div');
    todo.innerHTML = text;
    return todo;
}

function generate_img_trash(id_todo) {
    var img_trash = document.createElement('img');
    img_trash.className = 'todo-list__item_trash';
    img_trash.src = '/images/trash.png';
    img_trash.addEventListener('touchend', function () {
        fetch('/api/v1/todo/' + id_todo, {
            method: 'DELETE'
        }).then(update);
    });
    return img_trash
}
function generate_img_load() {
    var img_load = document.createElement('img');
    img_load.src = '/images/loading.gif';
    img_load.style = "display:none;";
    return img_load
}


function add_todo(id_todo, text, todo_list_block) {

    var todo_block = document.createElement('div');
    todo_block.className = 'todo-list__item';
    todo_block.dataset.id = id_todo;
    var img_trash = generate_img_trash(id_todo);

    swipedetect(todo_block, function (swipedir) {
        if (swipedir === 'left') {
            img_trash.style = "display: block;"
        }
        if (swipedir === 'right') {
            img_trash.style = "display: none;"
        }
    });

    var todo_input = generate_input_edit(text);
    var todo = generate_div_todo(text);
    var click_todo = function (event) {
        todo_input.style = 'display: block';
        todo.style = 'display: none';
        return false;
    };
    swipedetect(todo, false, click_todo);


    todo_input.addEventListener('blur', function (event) {
        var new_val_todo = todo_input.value;
        var formData = new FormData();
        formData.append('todo', new_val_todo);
        fetch('/api/v1/todo/' + id_todo, {
            method: 'PUT',
            body: formData
        }).then(function () {
                todo.innerHTML = new_val_todo;
                todo.style = 'display: block';
                todo_input.style = 'display: none';
            }
        );

    }, false);
    todo_block.appendChild(todo);
    todo_block.appendChild(todo_input);
    todo_block.appendChild(img_trash);
    todo_list_block.appendChild(todo_block);
}


function send_form(event) {
    fetch('/api/v1/todo/', {
        method: 'POST',
        body: new FormData(this)
    }).then(update);
    return false;
}
var img_load = generate_img_load();
function update() {
    fetch('/api/v1/todo/')
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            var todo_list = document.getElementsByClassName('todo-list')[0];
            img_load.style = 'display: none';
            todo_list.innerHTML = '';

            todo_list.appendChild(img_load);
            json.forEach(function (todo, index) {
                add_todo(index, todo['todo'], todo_list);
            });
        });
}

window.onload = function () {
    var form = document.getElementsByClassName('todo-list__form')[0];
    var todo_list = document.getElementsByClassName('todo-list')[0];
    todo_list.style = "text-align: center;";
    swipedetect(todo_list, function (swipedir) {
        if (swipedir === "down") {
            img_load.style = 'display: inline; width:100px';
            setTimeout(update, 2000);
        }
    });
    form.onsubmit = send_form;
    update();
};

function swipedetect(el, callback, callbackclick) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 150, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) {
            },
        handlerclick = callbackclick || function (swipedir) {
            };
    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
        //e.preventDefault();
    }, false);

    touchsurface.addEventListener('touchmove', function (e) {
        //e.preventDefault(); // prevent scrolling when inside DIV
    }, false);

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed

        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
            swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
        }
        else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
            swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
        }
        if (elapsedTime > 200) {
            handleswipe(swipedir);
        } else {
            handlerclick(e);
        }
        //e.preventDefault()
    }, false)
}