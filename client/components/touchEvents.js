"use strict";

export const tap = (e, cb) => {
    if (e.targetTouches.length !== 1) {
        return;
    }
    var start = {
        pageX: e.targetTouches[0].pageX,
        pageY: e.targetTouches[0].pageY,
        time: new Date().getTime()
    };
    e.currentTarget.addEventListener('touchend', tapEndListener);

    function tapEndListener(e) {
        if (e.changedTouches.length !== 1) {
            return;
        }
        var time = new Date().getTime();
        var touch = e.changedTouches[0];
        if (time - start.time < 150 &&
            Math.abs(start.pageX - touch.pageX) < 20 &&
            Math.abs(start.pageY - touch.pageY) < 20) {
            cb(e);
        }
        e.currentTarget.removeEventListener('touchend', tapEndListener);
    }
};

export const swipe = (e, dir, cb) => {
    if (e.targetTouches.length !== 1) {
        return;
    }
    var start = {
        pageX: e.targetTouches[0].pageX,
        pageY: e.targetTouches[0].pageY
    };
    e.currentTarget.addEventListener('touchmove', move);

    function move(e) {
        if (e.targetTouches.length !== 1) {
            e.currentTarget.removeEventListener('touchmove', move);
            return;
        }
        var touch = e.targetTouches[0];
        if (start.pageX - touch.pageX > 50 && Math.abs(start.pageY - touch.pageY) < 30) {
            if (dir === 'left') {
                cb(e);
            }
            e.currentTarget.removeEventListener('touchmove', move);
            return;
        }
        if (touch.pageX - start.pageX > 50 && Math.abs(start.pageY - touch.pageY) < 30) {
            if (dir === 'right') {
                cb(e);
            }
            e.currentTarget.removeEventListener('touchmove', move);
            return;
        }
        if (start.pageY - touch.pageY > 50 && Math.abs(start.pageX - touch.pageX) < 30) {
            if (dir === 'up') {
                cb(e);
            }
            e.currentTarget.removeEventListener('touchmove', move);
            return;
        }
        if (touch.pageY - start.pageY > 50 && Math.abs(start.pageX - touch.pageX) < 30) {
            if (dir === 'down') {
                cb(e);
            }
            e.currentTarget.removeEventListener('touchmove', move);
        }
    }
};
