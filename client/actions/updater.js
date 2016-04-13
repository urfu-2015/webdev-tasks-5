export const shiftUpdater = (value) => {
    if (value > 50) return;
    document.body.style.marginTop = -50 + value + 'px';
};

export const resetUpdater = () => {
    document.body.style.marginTop = -50 + 'px';
};

export const startRotate = () => {
    document.querySelector('.reload__img').style.animationPlayState = 'running';
};

export const stopRotate = () => {
    document.querySelector('.reload__img').style.animationPlayState = 'paused';
};
