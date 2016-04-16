'use strict';

import {deleteItem} from '../client-request';

var target = null;
var store;

export const resetDel = () => {
    var del = document.querySelector('.delete');
    del.style.display = 'none';
    del.style.top = 0;
    del.style.left = 0;
    target = null;
};

export const handlerDelete = (event) => {
    event.stopPropagation();
    deleteItem(target, store, () => {
        resetDel();
    });
};

export const createDel = (targetItem, currStore) => {
    var del = document.querySelector('.delete');
    del.style.display = 'block';
    store = currStore;
    target = targetItem;
    moveDel();
};

export const moveDel = () => {

    var delOffsetLeft = target.offsetWidth * 0.8 + target.offsetLeft;
    if (!target) return;
    var del = document.querySelector('.delete');
    del.style.top = `${target.offsetTop}px`;
    del.style.left = `${delOffsetLeft}px`;
    del.style.height = `${target.offsetHeight}px`;
};
