'use strict';

(function () {
    
    var TapHandler = function (element) {
        this.__element = element;
        this.tapCB = function () {};
        this.swipeLeftCB = function () {};
        this.swipeRightCB = function () {};
        this.__setEventHandlers();
    };
    
    TapHandler.prototype.__setEventHandlers = function () {
        this.__element.addEventListener('touchstart', this.__touchStart.bind(this));
        this.__element.addEventListener('touchmove', this.__touchMove.bind(this));
        this.__element.addEventListener('touchend', this.__touchEnd.bind(this));
    };
    
    TapHandler.prototype.__touchStart = function (event) {
        this.__startX = event.touches[0].screenX;
        this.__startY = event.touches[0].screenY;
    };
    
    TapHandler.prototype.__touchMove = function (event) {
        event.preventDefault();
        this.__endX = event.touches[0].screenX;
        this.__endY = event.touches[0].screenY;
    };
    
    TapHandler.prototype.__touchEnd = function (event) {
        if (Math.abs(this.__startY - this.__endY) > 30) {
            return this.swipeLeftCB();
        } else if (Math.abs(this.__endY - this.__startY) > 30) {
            return this.swipeRightCB();
        } else {
            return this.tapCB();
        }
    };
    
    window.TapHandler = TapHandler;
})();