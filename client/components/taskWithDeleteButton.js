"use strict";

import React from 'react';
import DeleteButton from './deleteButton';
import {removeDeleteButton} from '../action';
import {swipe} from './touchEvents';

export default ({key, text, store}) => {
    function removeDeleteButtonListener(e) {
        swipe(e, 'right', () => store.dispatch(removeDeleteButton()));
    }
    return (<div className="task" key={key}>
        <div className="task__name_with-del-btn" onTouchStart={removeDeleteButtonListener}>
            {text}
        </div>
        <DeleteButton store={store}/>
    </div>);
};
