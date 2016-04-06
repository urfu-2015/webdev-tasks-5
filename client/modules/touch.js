export const getNodeIndex = (node) => {
    var item = node.parentNode;

    var index = 0;
    while( (item = item.previousSibling) != null )
        index++;

    return index;
};

export const swipeEvent = (event, direction, callback) => {
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
};

export const tapEvent = (event, callback) => {
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
};
