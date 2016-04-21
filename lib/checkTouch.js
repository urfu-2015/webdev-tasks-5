exports.isTap = (start, event, ldelay) => {
    var pdelay = new Date();
    if (pdelay.getTime() - ldelay.getTime() > 800 ||
        event.changedTouches.length > 1) {
        return false;
    }
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY;
    return (x === start.x && y === start.y);
};

exports.isLeftSwipe = (start, event) => {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    var xDelta = start.x - x;
    var yDelta = Math.abs(start.y - y);
    return (xDelta > 300 && yDelta < 50);
};

exports.isRightSwipe = (start, event) => {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    var xDelta = x - start.x;
    var yDelta = Math.abs(start.y - y);
    return (xDelta > 250 && yDelta < 50);
}
;
exports.isDownSwipe = (start, event) => {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY;
    var xDelta = Math.abs(x - start.x);
    var yDelta = y - start.y;
    return (xDelta < 300 && yDelta > 300);
};
