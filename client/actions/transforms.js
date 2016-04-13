export const resetTransform = (target) => {
    if (!target) return;

    target.style.transform = 'translateX(' + 0 + ') translateY(' + 0 + ')';
};

export const setTransformX = (target, value) => {
    if (!target) return;

    target.style.transform = "translateX(" + value + "px)";
};

export const setTransformY = (target, value) => {
    if (!target) return;

    target.style.transform = "translateY(" + value + "px) " + "scale(1.1) translateZ(100px)";
};
