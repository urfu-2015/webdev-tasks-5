
import React from 'react';
import request from '../lib/request.jsx';
import {deleteRemark} from '../actions.jsx';

function removeRemark(index, store) {
    request('DELETE', '/remarks/' + index, function(err) {
        if (err != undefined) {
            console.error(err);
            return;
        }
        let action = deleteRemark(index);
        store.dispatch(action);
    })
}

function clickHandler(store, isDeleted, index) {
    return function () {
        if (isDeleted) {
            removeRemark(index, store);
        }
    }
}

export default ({store, isDeleted, index, formClass, visibilityClass}) => {
    let nameClass = formClass + '__delete';
    nameClass += ' ' + visibilityClass;
    return (
        <button onClick={clickHandler(store, isDeleted, index)} className={nameClass}>
            <img src="/trush.png" alt="Удаление" />
        </button>
    )
}
