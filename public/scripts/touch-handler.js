
var touchHandler = {
    makeTouchable: function (element) {
        var body = document.querySelector("body");
        if (document.prevEvent === undefined) {
            document.prevEvent = null;
            body.addEventListener("touchstart", function (evt) {
                document.prevEvent = evt;
                document.prevEvent._currentTarget = evt.currentTarget;  
            }, false);
        }
        element.addEventListener("touchstart", function (evt) {
            if (
                document.prevEvent &&
                document.prevEvent._currentTarget === evt.currentTarget
            ) {
                evt.stopPropagation(); 
                return;
            }
            document.prevEvent = evt;
            document.prevEvent._currentTarget = evt.currentTarget;
        });
    },
    setEventListener: function (eventName, element, cb) {
        if (eventName === 'tap') {
            element.addEventListener("touchend", function (evt) {
                if (document.prevEvent.type === 'touchstart') {
                    cb(evt);
                }
                document.prevEvent = evt;
                document.prevEvent._currentTarget = evt.currentTarget;
                evt.stopPropagation();
            }, false);
            return;
        }
        if (eventName === 'swipe') {
            element.addEventListener("touchmove", function (evt) {
                var currTouch = evt.touches[0];
                var prevTouch = document.prevEvent.touches[0];
                if (
                    evt.currentTarget === document.prevEvent._currentTarget &&
                    document.prevEvent.type === 'touchmove' &&
                    prevTouch.pageX - currTouch.pageX > 0
                ) {
                    cb(evt);
                }
                document.prevEvent = evt;
                document.prevEvent._currentTarget = evt.currentTarget;
                evt.stopPropagation();
            }, false);
            return;
        }
    }
};
