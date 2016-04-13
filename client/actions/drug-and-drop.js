'use strict';

import {swipeLeft} from './swipe';

export const move = (item, direction, startPoint, finalPoint) => {
    var xAbs = Math.abs(finalPoint.pageX - startPoint.pageY);
    var length = item.offsetWidth * 0.2;

    if (direction === 'x') {
        if (xAbs < length) {
            item.style.transform = "translateX(" + (finalPoint.pageX - startPoint.pageX) + "px)";
        } else {
            swipeLeft(item, startPoint, finalPoint);
            createDel(item);
        }
    } else {
        item.style.transform = "translateY(" + (finalPoint.pageY - startPoint.pageY) + "px) " +
            "scale(1.1) translateZ(100px)";

    }
};
