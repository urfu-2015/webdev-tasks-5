"use strict";

"use strict";

import React from 'react';
import {showAddTaskForm} from '../action';
import {tap} from './touchEvents';

export default ({store}) => {
    function onTouchStart(e) {
        tap(e, () => store.dispatch(showAddTaskForm()));
    }

    return (
        <div className="add-task">
            <button className="add-task__button" onTouchStart={onTouchStart}>Добавить</button>
        </div>
    );
};

