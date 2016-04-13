'use strict';

import {getNotes} from '../actions';
import {update} from '../client-request';
import {resetUpdater, stopRotate} from './updater';

export const swipeLeft = (target) => {
    if (!target) return;
    target.style.transform = 'translateX(-' + 20 + '%)';
};

export const swipeDown = (store, finalPoint) => {
    if (finalPoint.pageY < document.documentElement.clientHeight) {
        event.preventDefault();
        document.body.style.marginTop = 0;
        update(store, () => {
            resetUpdater();
            stopRotate();
        });
    }
};
