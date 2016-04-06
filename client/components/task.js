"use strict";

import React from 'react';
import {swipe} from './touchEvents';
import {showDeleteButton, removeDeleteButton} from '../action';
import DeleteButton from './deleteButton';

export default ({key, id, text, store}) => {
    function showDeleteButtonListener(e) {
        swipe(e, 'left', e =>
            store.dispatch(showDeleteButton(e.target.dataset.reactid
                .replace(/.+\$(\w+)\..+/, '$1')))
        );
    }
    function removeDeleteButtonListener(e) {
        swipe(e, 'right', () => {
            store.dispatch(removeDeleteButton());
        });
    }

    if (store.getState().deleteButtonOnTask === id) {
        return <div className="task" key={key}>
            <div className="task__name" onTouchStart={removeDeleteButtonListener}>
                {text}
            </div>
            <DeleteButton store={store}/>
        </div>;
    }
    return <div className="task" key={key}>
        <div className="task__name" onTouchStart={showDeleteButtonListener}>
            {text}
        </div>
    </div>;
};
