'use strict';

var divsNotes = [];
var stack = [];

function stepOfShift(step) {
    if (stack.indexOf(divsNotes[currentOrder + step]) > -1) {
        stack.pop().style.transform = "translateY(" + 0 + "px)";
    } else {
        stack.push(divsNotes[currentOrder + step]);
        divsNotes[currentOrder + step].style.transform = "translateY(" +
            (step * (divsNotes[0].offsetTop - divsNotes[1].offsetTop)) + "px)";
    }
    currentOrder += step;
}

function condition(touch, step) {
    if (stack.indexOf(divsNotes[currentOrder + step]) > - 1) {
        return touch.pageY < stack[stack.length - 2].offsetTop + stack[stack.length - 2].offsetHeight / 2 &&
            touch.pageY > stack[stack.length - 2].offsetTop;
    }
    return touch.pageY < divsNotes[currentOrder + step].offsetTop + divsNotes[currentOrder + step].offsetHeight / 2 &&
        touch.pageY > divsNotes[currentOrder + step].offsetTop;
}

export const shift = (item, touch) => {
    divsNotes = [...container.childNodes];
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