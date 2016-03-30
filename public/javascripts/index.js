var coords = {};
var gif = document.getElementById('refresh');

var save = function (e) {

    var ID = e.target.getAttribute("id");
    var id = ID.substring(ID.indexOf('-') + 1);

    var xhrUpdate = new XMLHttpRequest();
    var formData = new FormData(document.forms['update-form' + id]);

    xhrUpdate.open("PATCH", "/todo/" + id);

    xhrUpdate.onreadystatechange = function () {
        if (xhrUpdate.readyState !== 4) {
            return;
        }

        if (xhrUpdate.status !== 200) {
            console.log(xhrUpdate.status + ': ' + xhrUpdate.statusText);
        } else {
            var result = JSON.parse(xhrUpdate.responseText);

            document.getElementById(id).innerHTML = result.text;
        }

    };
    xhrUpdate.send(formData);
};

var update = function (e) {
    var id = e.currentTarget.getAttribute("id");
    if (document.getElementById('save-' + id)) {
        return;
    }

    e.currentTarget.innerHTML = '<form name="update-form' + id + '">' +
        '<input name="update-text" id="update-text-field" type="text" ' +
        'value="' + e.currentTarget.innerText + '">' +
        '</form>' + '<button name="save-btn" id="save-' + id + '">Сохранить</button>';

    var idup = 'save-' + id;
    var btnSave = document.getElementById(idup);

    btnSave.addEventListener('touchstart', function (e) {
        var touch = e.targetTouches[0];
        coords[idup] = [touch.pageX, touch.pageY];
    });
    btnSave.addEventListener('touchend', function (e) {
        e.stopPropagation();
        var touch = e.changedTouches[0];
        if (coords[idup]) {
            var touchStartCoords = coords[idup];
            delete coords[idup];
            if (Math.abs(touchStartCoords[0] - touch.pageX) < 2 &&
                Math.abs(touchStartCoords[1] - touch.pageY) < 2) {
                save(e);
            }
        }
    });
};

var remove = function (e) {

    var xhrDel = new XMLHttpRequest();
    var formData = new FormData(document.forms.todos);

    var ID = e.target.getAttribute("id");
    var id = ID.substring(ID.indexOf('-') + 1);

    xhrDel.open("DELETE", "/todo/" + id);

    xhrDel.onreadystatechange = function () {
        if (xhrDel.readyState !== 4) {
            return;
        }

        if (xhrDel.status !== 200) {
            console.log(xhrDel.status + ': ' + xhrDel.statusText);
        } else {
            document.getElementById('ul-list').removeChild(document.getElementById(id));
            document.getElementById('ul-list').removeChild(document.getElementById('delete-' + id));
        }

    };

    xhrDel.send(formData);
};

var refresh = function () {
    var xhrRefresh = new XMLHttpRequest();
    var formData = new FormData(document.forms.todos);

    xhrRefresh.open('GET', '/todo');

    xhrRefresh.onreadystatechange = function () {
        if (xhrRefresh.readyState !== 4) {
            return;
        }

        if (xhrRefresh.status !== 200) {
            console.log(xhrRefresh.status + ': ' + xhrRefresh.statusText);
        } else {
            document.getElementById('list').innerHTML = template({todos: JSON.parse(xhrRefresh.responseText)});

            var btnupdate = document.querySelectorAll("li");
            for (var up = 0; up < btnupdate.length; up++) {
                btnupdate[up].addEventListener('touchstart', function (e) {
                    var id = e.currentTarget.getAttribute("id");
                    var touch = e.targetTouches[0];
                    coords[id] = [touch.pageX, touch.pageY];
                });

                btnupdate[up].addEventListener('touchend', function (e) {
                    var id = e.currentTarget.getAttribute("id");
                    e.stopPropagation();
                    var touch = e.changedTouches[0];
                    if (coords[id]) {
                        var touchStartCoords = coords[id];
                        delete coords[id];
                        if (Math.abs(touchStartCoords[0] - touch.pageX) < 2 &&
                            Math.abs(touchStartCoords[1] - touch.pageY) < 2) {
                            update(e);
                        }
                        if (touchStartCoords[0] > touch.pageX) {
                            document.getElementById('remove-' + id).style.display = 'block';
                            document.getElementById(id).style.width = '80%';
                            setTimeout(function () {
                                remove(e);
                            }, 500);
                        }
                    }
                });
            }
        }
    };
    xhrRefresh.send(formData);
    setTimeout(function () {
        gif.setAttribute('class', 'invisible');
    }, 1000);
};

var add = function () {
    var xhrPost = new XMLHttpRequest();
    var formData = new FormData(document.forms.todos);

    xhrPost.open("POST", "/todo");

    xhrPost.onreadystatechange = function () {
        if (xhrPost.readyState !== 4) {
            return;
        }

        if (xhrPost.status !== 200) {
            console.log(xhrPost.status + ': ' + xhrPost.statusText);
        } else {
            var result = JSON.parse(xhrPost.responseText);
            if (result.text !== '') {
                var newLi = document.createElement('li');
                newLi.id = result._id;
                newLi.innerHTML = result.text;

                document.getElementById('ul-list').appendChild(newLi);
            }

            document.getElementById('text-field').value = '';
        }

    };

    xhrPost.send(formData);
};

var raw_template = '<ul id="ul-list">' +
    '{{#each todos}}' +
    '<li id="{{_id}}">{{text}}</li>' +
    '<button name="delete" id="remove-{{_id}}">Удалить</button> ' +
    '{{/each}}' +
    '</ul>';

var template = Handlebars.compile(raw_template);

var btn = document.getElementById('add');
btn.addEventListener('touchstart', function (e) {
    var touch = e.targetTouches[0];
    coords[e.target.getAttribute("id")] = [touch.pageX, touch.pageY];
});
btn.addEventListener('touchend', function (e) {
    var touch = e.changedTouches[0];
    var id = e.target.getAttribute("id");
    if (coords[id]) {
        var touchStartCoords = coords[id];
        delete coords[id];
        if (Math.abs(touchStartCoords[0] - touch.pageX) < 2 &&
            Math.abs(touchStartCoords[1] - touch.pageY) < 2) {
            add();
        }
    }
});

var objRefresh = document.getElementById('list');
objRefresh.addEventListener('touchstart', function (e) {
    var touch = e.targetTouches[0];
    coords['body'] = [touch.pageX, touch.pageY];
}, true);
objRefresh.addEventListener('touchend', function (e) {
    var touch = e.changedTouches[0];
    if (coords['body']) {
        var touchStartCoords = coords['body'];
        delete coords['body'];
        if (Math.abs(touchStartCoords[1] - touch.pageY) > 2) {
            gif.setAttribute('class', 'loading-gif');
            refresh();
        }
    }
}, true);

refresh();