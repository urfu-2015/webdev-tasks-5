const sizeOfUpdater = 50;

export const shiftUpdater = (value) => {
    if (value > 50) return;
    document.body.style.marginTop = `${-sizeOfUpdater + value}px`;
};

export const resetUpdater = () => {
    document.body.style.marginTop = `${-sizeOfUpdater}px`;
};

export const startRotate = () => {
    document.querySelector('.reload__img').style.animationPlayState = 'running';
};

export const stopRotate = () => {
    document.querySelector('.reload__img').style.animationPlayState = 'paused';
};
