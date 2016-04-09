
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

function defineStyle(mode) {
    if (modes.nan !== mode) {
        return {
            display: 'none'
        }
    } else {
        return {
            display: 'block'
        }
    }
}

export default ({store}) => {
    let {mode} = store.getState();
    let styleForButton = defineStyle(mode);
    return  (
        <input type="submit" value="Создать новую" className="new-remark"
               onClick={clickHandler(store)} style={styleForButton}/>
    )
};
