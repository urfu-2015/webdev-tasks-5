'use strict';

import {deleteItem} from '../client-request';

var target = null;

export const resetDel = () => {
    var del = document.querySelector('.delete');
    del.style.display = 'none';
    del.style.top = 0;
    del.style.left = 0;
    target = null;
};

export const handlerDelete = (event) => {
    deleteItem(target, resetDel);
};

export const createDel = (targetItem) => {
    var del = document.querySelector('.delete');
    target = targetItem;
    del.style.display = 'block';
    del.style.top = target.offsetTop + 'px';
    del.style.left = target.offsetWidth * 0.8 + target.offsetLeft + 'px';
    del.style.height = target.offsetHeight + 'px';
};