'use strict';

import {swipeLeft} from './swipe';

export const move = (item, direction, startPoint, finalPoint) => {
    var xAbs = Math.abs(finalPoint.pageX - startPoint.pageY);
    var length = item.offsetWidth * 0.2;
    var offsetY = finalPoint.pageY - startPoint.pageY;
    var offsetX = finalPoint.pageX - startPoint.pageX;

    if (direction === 'x') {
        if (xAbs < length) {
            item.style.transform = `translateX(${offsetX}px)`;
        } else {
            swipeLeft(item, startPoint, finalPoint);
            createDel(item);
        }
    } else {

        item.style.transform = `translateY(${offsetY}px) scale(1.1) translateZ(100px)`;

    }
};
