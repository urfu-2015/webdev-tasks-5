'use strict';

var currentOrder;
var stack = [];

function stepOfShift(step) {
    var divsNotes = document.querySelector('.container').childNodes;
    var offsetValueY = step * (divsNotes[0].offsetTop - divsNotes[1].offsetTop);
    if (stack.indexOf(divsNotes[currentOrder + step]) > -1) {
        stack.pop().style.transform = 'translateY(0px)';
    } else {
        stack.push(divsNotes[currentOrder + step]);
        divsNotes[currentOrder + step].style.transform = `translateY(${offsetValueY}px)`;
    }
    currentOrder += step;
}

function condition(touch, step) {
    var divsNotes = document.querySelector('.container').childNodes;
    var middleOfNextItem;
    if (stack.indexOf(divsNotes[currentOrder + step]) > - 1) {
        middleOfNextItem = stack[stack.length - 2].offsetTop + stack[stack.length - 2].offsetHeight / 2;
        return touch.pageY < middleOfNextItem && touch.pageY > stack[stack.length - 2].offsetTop;
    }
    middleOfNextItem = divsNotes[currentOrder + step].offsetTop + divsNotes[currentOrder + step].offsetHeight / 2;
    return touch.pageY < middleOfNextItem && touch.pageY > divsNotes[currentOrder + step].offsetTop;
}

export const shift = (item, touch) => {
    var divsNotes = [...container.childNodes];
    var currentOrder = divsNotes.indexOf(item);

    if (currentOrder > 0) {
        if (condition(touch, -1)) {
            stepOfShift(-1);
        }
    }

    if (currentOrder < divsNotes.length - 1) {
        if (condition(touch, 1)) {
            stepOfShift(1);
        }
    }
};