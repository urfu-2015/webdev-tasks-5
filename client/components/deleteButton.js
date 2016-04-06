"use strict";

import React from 'react';
import {tap} from './touchEvents';
import {removeTask} from '../action';
import request from '../request';

export default ({store}) => {
    function onTouchStart(e) {
        var id = e.target.dataset.reactid.replace(/.+\$(\w+)\..+/, '$1');
        tap(e, () => {
            request('DELETE', '/tasks/' + id, {}, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }
                store.dispatch(removeTask(id));
            });
        });
    }
    return (
        <div className="task__delete-button" onTouchStart={onTouchStart}></div>
    );
};
