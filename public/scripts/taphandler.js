'use strict';

(function () {
    
    var TapHandler = function (element) {
        this.__element = element;
        this.tapCB = function () {};
        this.swipeLeftCB = function () {};
        this.swipeRightCB = function () {};
        this.swipeUpCB = function () {};
        this.swipeDownCB = function () {};
        if (this.__element) {
            this.__setEventHandlers();
        }
    };
    
    TapHandler.prototype.__eraseAndCallCB = function (cb) {
        delete this.__startX;
        delete this.__startY;
        delete this.__endX;
        delete this.__endY;
        return cb();
    };
    
    TapHandler.prototype.__setEventHandlers = function () {
        this.__element.addEventListener('touchstart', this.touchStart.bind(this));
        this.__element.addEventListener('touchmove', this.touchMove.bind(this));
        this.__element.addEventListener('touchend', this.touchEnd.bind(this));
    };
    
    TapHandler.prototype.__getTouchPosition = function (event) {
        return (event.touches) ? event.touches[0] : event.changedTouches[0];
    };
    
    TapHandler.prototype.touchStart = function (event) {
        this.__startX = this.__getTouchPosition(event).screenX;
        this.__startY = this.__getTouchPosition(event).screenY;
    };
    
    TapHandler.prototype.touchMove = function (event) {
        event.preventDefault();
        this.__endX = this.__getTouchPosition(event).screenX;
        this.__endY = this.__getTouchPosition(event).screenY;
    };
    
    TapHandler.prototype.touchEnd = function (event) {
        if (this.__endX === undefined || this.__endY == undefined) {
            return this.__eraseAndCallCB(this.tapCB);
        }
        var deltaY = Math.abs(this.__endY - this.__startY);
        var deltaX = Math.abs(this.__endX - this.__startX);
        if (deltaY > deltaX) {
            if (this.__startY > this.__endY) {
                return this.__eraseAndCallCB(this.swipeUpCB);
            } else {
                return this.__eraseAndCallCB(this.swipeDownCB);
            }
        } else {
            if (this.__startX > this.__endX) {
                return this.__eraseAndCallCB(this.swipeLeftCB);
            } else {
                return this.__eraseAndCallCB(this.swipeRightCB);
            }
        }
    };
    
    window.TapHandler = TapHandler;
})();