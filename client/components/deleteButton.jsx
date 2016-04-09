
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
    return function (event) {
        if (isDeleted) {
            removeRemark(index, store);
        }
    }
}


export default ({styleFor, store, isDeleted, index}) => {
    return (
        <button style={styleFor} onClick={clickHandler(store, isDeleted, index)}>
            <img src="/images/trush.png" alt="Удаление" />
        </button>
    )
}