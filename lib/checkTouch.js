module.exports.isTap = (start, event) => {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY; 
    return (x === start.x && y == start.y);
}

module.exports.isLeftSwipe = (start, event) => {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    return (start.x - x > 300 && Math.abs(start.y - y) < 50);
}

module.exports.isRightSwipe = (start, event) => {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.touches[0].pageX;
    var y = event.touches[0].pageY;
    return (x - start.x > 300 && Math.abs(start.y - y) < 50);
}

module.exports.isDownSwipe = (start, event) => {
    if (event.changedTouches.length > 1) {
        return false;
    }
    var x = event.changedTouches[0].pageX;
    var y = event.changedTouches[0].pageY;
    return (Math.abs(x - start.x) < 300 && y - start.y > 300);
}
