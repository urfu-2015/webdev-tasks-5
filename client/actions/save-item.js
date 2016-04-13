import {getNotes, callSaveForm} from '../actions';

export const renderSave = (target, store) => {
    var textSaveItem;

    if (target.className === 'container__item') {
        textSaveItem = target.childNodes[0].innerHTML;
    } else {
        textSaveItem = target.innerHTML;
    }

    var action = callSaveForm(textSaveItem);
    store.dispatch(action);
    document.querySelector('.save__text').focus();
};

export const resetSave = (touch, store) => {
    if (document.querySelector('.save') && !touch.target.closest('.save')) {
        let action = getNotes(store.getState().notes);
        store.dispatch(action);
    }
};
