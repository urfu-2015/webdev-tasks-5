'use strict';

import {changeOrder, getNotes} from '../actions';

var stack = [];
var currentOrder;

export const initShift = (target) => {
    if (target) {
        var divsNotes = [...document.querySelector('.container').childNodes];
        currentOrder = divsNotes.indexOf(target);

        target.style.transform = 'translateZ(100px) scale(1.1)';
        stack.push(target);
    }
};

export const shift = (touch) => {

    (currentOrder > 0) && condition(touch, -1) && stepOfShift(-1);
    (currentOrder < document.querySelector('.container').childNodes.length - 1) && condition(touch, 1) && stepOfShift(1);

    //if (currentOrder > 0) {
    //    if (condition(touch, -1)) {
    //        stepOfShift(-1);
    //    }
    //}

    //if (currentOrder < document.querySelector('.container').childNodes.length - 1) {
    //    if (condition(touch, 1)) {
    //        stepOfShift(1);
    //    }
    //}
};

function condition(touch, step) {
    var divsNotes = document.querySelector('.container').childNodes;
    if (stack.indexOf(divsNotes[currentOrder + step]) > - 1) {
        return touch.pageY < stack[stack.length - 2].offsetTop + stack[stack.length - 2].offsetHeight / 2 &&
            touch.pageY > stack[stack.length - 2].offsetTop;
    }
    return touch.pageY < divsNotes[currentOrder + step].offsetTop + divsNotes[currentOrder + step].offsetHeight / 2 &&
        touch.pageY > divsNotes[currentOrder + step].offsetTop;
}

function stepOfShift(step) {
    var divsNotes = [...document.querySelector('.container').childNodes];
    var intervalDivsNotes;
    if (stack.indexOf(divsNotes[currentOrder + step]) > -1) {
        stack.pop().style.transform = "translateY(" + 0 + "px)";
    } else {
        intervalDivsNotes = divsNotes[0].offsetTop - divsNotes[1].offsetTop;
        stack.push(divsNotes[currentOrder + step]);
        divsNotes[currentOrder + step].style.transform = "translateY(" + (step * intervalDivsNotes) + "px)";
    }
    currentOrder += step;
}

export const finishShift = (store) => {
    if (stack.length === 1) {
        return;
    }

    var stringStack = stack.map(item => {
        return item.childNodes[0].innerHTML;
    });

    var action = changeOrder(stringStack);
    store.dispatch(action);

    stack = [];
};
