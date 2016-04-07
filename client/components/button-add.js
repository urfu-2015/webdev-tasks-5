import React from 'react';
import {selectAddButton} from '../actions';

export default ({store}) => {

    function onClick (event) {
        event.preventDefault();
        store.dispatch(selectAddButton());
    }

    return (
        <button className="button-add" onClick={onClick}>
            Добавить
        </button>
    )
}
