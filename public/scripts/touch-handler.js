
var touchHandler = {
    makeTouchable: function (element) {
        var body = document.querySelector("body");
        if (document.prevEvent === undefined) {
            document.prevEvent = null;
            document.addEventListener("touchstart", function (evt) {
                document.prevEvent = evt;
            }, false);
            document.addEventListener("touchmove", function (evt) {
                document.prevEvent = evt;
            }, false);
            document.addEventListener("touchend", function (evt) {
                document.prevEvent = evt;
            }, false);
        }
        element.addEventListener("touchstart", function (evt) {
            element.prevEvent = evt;
        });
    },
    setEventListener: function (eventName, element, cb) {
        if (eventName === 'tap') {
            element.addEventListener("touchend", function (evt) {
                if (element.prevEvent.type === 'touchstart') {
                    cb(evt);
                }
                element.prevEvent = evt;
            }, false);
            return;
        }
        if (eventName === 'swipe') {
            element.addEventListener("touchmove", function (evt) {
                var currTouch = evt.touches[0];
                var prevTouch = document.prevEvent.touches[0];
                var diffX = prevTouch.pageX - currTouch.pageX;
                var diffY = currTouch.pageY - prevTouch.pageY;
                var touchesDiff = Math.sqrt(diffX*diffX + diffY*diffY);
                var sine = Math.abs(diffX) / touchesDiff;
                if (
                    element.prevEvent === document.prevEvent &&
                    element.prevEvent.type === 'touchmove' &&
                    sine > 0.5
                ) {
                    evt.direction = diffX > 0 ? 'left' : 'right';
                    cb(evt);
                }
                element.prevEvent = evt;
            }, false);
            return;
        }
        if (eventName === 'scroll') {
            element.addEventListener("touchmove", function (evt) {
                var currTouch = evt.touches[0];
                var prevTouch = document.prevEvent.touches[0];
                var diffX = prevTouch.pageX - currTouch.pageX;
                var diffY = currTouch.pageY - prevTouch.pageY;
                var touchesDiff = Math.sqrt(diffX * diffX + diffY * diffY);
                var sine = Math.abs(diffX) / touchesDiff;
                if (
                    element.prevEvent === document.prevEvent &&
                    element.prevEvent.type === 'touchmove' &&
                    sine <= 0.5
                ) {
                    evt.direction = diffY > 0 ? 'down' : 'up';
                    cb(evt);
                }
                element.prevEvent = evt;
            }, false);
            return;
        }
        if (eventName === 'touchleave') {
            var _cb = function (evt) {
                if (
                    document.prevEvent !== element.prevEvent
                ) {
                    cb();
                    document.removeEventListener("touchstart", _cb);   
                }
            };
            document.addEventListener('touchstart', _cb, false);
            return;
        }
    }
};
