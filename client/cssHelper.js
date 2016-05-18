export function getCurrentTranslate(element) {
    return element.style.transform ? parseInt(element.style.transform.split('(')[1], 10) : 0;
}

export function buildNewTransform(translateValue, dir) {
    return `translate${dir}(${translateValue.toString()}px)`
}

export function activateDeleteButton(swipeTarget) {
    swipeTarget.parentElement.querySelector('.todo__delete-button').removeAttribute('disabled');
}

export function disableDeleteButton(swipeTarget) {
    swipeTarget.parentElement.querySelector('.todo__delete-button').setAttribute('disabled', 'disabled');
}
