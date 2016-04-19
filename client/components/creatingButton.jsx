
import React from 'react';
import request from '../lib/request.jsx';
import {addRemark, createRemark} from '../actions.jsx';
import {modes} from '../reducer.jsx';

function clickHandler(store) {
    return function (event) {
        event.preventDefault();
        let action = createRemark();
        store.dispatch(action);
    }
}

function defineClass(mode) {
    if (modes.creating === mode || modes.redo === mode) {
        return 'new-remark_hidden new-remark';
    } else {
        return 'new-remark_visible new-remark';
    }
}

export default ({store}) => {
    let {mode} = store.getState();
    let classForButton = defineClass(mode);
    return  (
        <input type="submit" value="Создать новую" className={classForButton}
               onClick={clickHandler(store)} />
    )
};
