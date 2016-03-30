function senRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Access', 'application/json;');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            callback({status: xhr.status, content: xhr.statusText});
        } else {
            callback(null, JSON.parse(xhr.responseText));
        }
    };
}

function getByClassName(className) {
    return document.getElementsByClassName(className);
}

function getList(error) {
    if (error) {
        console.error(error);
        return;
    }

    var reload = getByClassName('reload')[0];
    reload.style.display = 'block';
    setTimeout(senRequest('GET', '/list', {}, function (error, data) {
        if (error) {
            console.error(error);
            return;
        }
        if (data.status.indexOf('OK') >= 0) {
            showList(data.content);
            reload.style.display = 'none';
        }
    }), 0);
}

function addItemList(error) {
    if (error) {
        console.error(error);
        return;
    }

    var text = 'Новая заметка!';
    setTimeout(senRequest('POST', '/list', {content: text}, function (error, data) {
        if (error) {
            console.error(error);
            return;
        }
        if (data.status.indexOf('OK') >= 0) {
            var itemDiv = createItemList(text);
            var container = getByClassName('main-container__list')[0];
            container.insertBefore(itemDiv, getByClassName('main-container__item')[0]);
            //itemDiv.children[0].style.display = 'none';
            //itemDiv.children[1].style.display = 'block';
            //itemDiv.children[2].style.display = 'block';
            //itemDiv.children[3].style.display = 'none';
        }
    }), 0);
}

function deleteItemList(error, event) {
    if (error) {
        console.error(error);
        return;
    }

    var item = event.currentTarget.parentNode;
    var container = item.parentNode.children;

    var id;
    for (var i = 0; i < container.length; ++i) {
        id = container[i] === item ? i : id;
    }

    setTimeout(senRequest('DELETE', '/list', {id: id}, function (error, data) {
        if (error) {
            console.error(error);
            return;
        }
        if (data.status.indexOf('OK') >= 0) {
            item.remove();
        }
    }), 0);
}

function updateItemList(error, event) {
    if (error) {
        console.error(error);
        return;
    }

    var item = event.currentTarget.parentNode;
    var container = item.parentNode.children;

    var id;
    var text = item.children[1].value;
    for (var i = 0; i < container.length; ++i) {
        id = container[i] === item ? i : id;
    }

    setTimeout(senRequest('PUT', '/list', {id: id, content: text}, function (error, data) {
        if (error) {
            console.error(error);
            return;
        }
        if (data.status.indexOf('OK') >= 0) {
            item.children[0].innerHTML = text;
            item.children[0].style.display = 'block';
            item.children[1].style.display = 'none';
            item.children[2].style.display = 'none';
        }
    }), 0);
}

function showList(todoList) {
    var newListDiv = document.createElement('div');
    newListDiv.className = 'main-container__list';
    newListDiv.addEventListener('touchstart', getListEvent);
    todoList.forEach(function (content) {
        newListDiv.appendChild(createItemList(content));
    });
    var oldListDiv = getByClassName('main-container__list')[0];
    oldListDiv.parentNode.removeChild(oldListDiv);
    var container = getByClassName('main-container')[0];
    container.insertBefore(newListDiv, getByClassName('main-container__button')[0]);
}

function createItemList(content) {
    var itemDiv = document.createElement('div');
    itemDiv.className = 'main-container__item';
    itemDiv.innerHTML = '<div class="main-container__text">' + content + '</div>' +
                        '<textarea class="main-container__textarea">' + content + '</textarea>' +
                        '<button class="main-container__send">Изменить</button>' +
                        '<div class="main-container__delete"><img src="/images/delete.png"></div>';
    itemDiv.children[0].addEventListener('touchstart', showDeleteItem);
    itemDiv.children[0].addEventListener('touchstart', hideDeleteItem);
    itemDiv.children[0].addEventListener('touchstart', showUpdateItem);
    itemDiv.children[2].addEventListener('touchstart', updateItemEvent);
    itemDiv.children[3].addEventListener('touchstart', deleteItemEvent);
    return itemDiv;
}

function getListEvent(event) {
    swipeEvent(event, 'down', getList);
}

function addItemEvent(event) {
    tapEvent(event, addItemList);
}

function showDeleteItem(event) {
    swipeEvent(event, 'left', function (error, event) {
        if (error) {
            console.error(error);
            return;
        }
        var item = event.currentTarget.parentNode;
        item.children[3].style.display = 'block';
    });
}

function hideDeleteItem(event) {
    swipeEvent(event, 'right', function (error, event) {
        if (error) {
            console.error(error);
            return;
        }
        var item = event.currentTarget.parentNode;
        item.children[3].style.display = 'none';
    });
}

function deleteItemEvent(event) {
    tapEvent(event, deleteItemList);
}

function showUpdateItem(event) {
    tapEvent(event, function (error, event) {
        if (error) {
            console.error(error);
            return;
        }
        var item = event.currentTarget.parentNode;
        var itemElements = item.children;
        itemElements[0].style.display = 'none';
        itemElements[1].style.display = 'block';
        itemElements[2].style.display = 'block';
        itemElements[3].style.display = 'none';
    });
}

function updateItemEvent(event) {
    tapEvent(event, updateItemList);
}

function swipeEvent(event, direction, callback) {
    if (event.targetTouches.length !== 1) {
        return;
    }

    var start = {
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY
    };
    var touchMoveEvent = function (event) {
        if (event.targetTouches.length !== 1) {
            return;
        }

        var end = {
            x: event.targetTouches[0].pageX,
            y: event.targetTouches[0].pageY
        };
        if ((start.y - end.y > 100 && direction === 'up') ||
            (end.y - start.y > 100 && direction === 'down') ||
            (start.x - end.x > 100 && direction === 'left') ||
            (end.x - start.x > 100 && direction === 'right')) {
            callback(null, event);
            event.currentTarget.removeEventListener('touchmove', touchMoveEvent);
        }
    };
    var stopTouch = function (event) {
        if (event.changedTouches.length !== 1) {
            return;
        }
        event.currentTarget.removeEventListener('touchmove', touchMoveEvent);
        event.currentTarget.removeEventListener('touchend', stopTouch);
    };
    event.currentTarget.addEventListener('touchmove', touchMoveEvent);
    event.currentTarget.addEventListener('touchend', stopTouch);
}

function tapEvent(event, callback) {
    if (event.targetTouches.length !== 1) {
        return;
    }
    var start = {
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY
    };
    var touchEndEvent = function (event) {
        if (event.changedTouches.length !== 1) {
            return;
        }

        var end = {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY
        };
        if ((start.x - end.x < 20) &&
            (start.y - end.y < 20) &&
            (end.x - start.x < 20) &&
            (end.y - start.y < 20)) {
            callback(null, event);
        }
        event.currentTarget.removeEventListener('touchend', touchEndEvent);
    };
    event.currentTarget.addEventListener('touchend', touchEndEvent);
}

getList();
getByClassName('add-button')[0].addEventListener('touchstart', addItemEvent);
