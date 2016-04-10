'use strict';

import React from 'react';
import {deleteTodo} from '../actions';
import {sendRequest} from '../modules/http';
import {getTodoId, tapEvent} from '../modules/touch';

export default ({store}) => {
    function deleteItemList(error, event) {
        if (error) {
            console.error(error);
            return;
        }

        var id = getTodoId(event.currentTarget);

        sendRequest('DELETE', '/list', {id: id}, function (error, data) {
            if (error) {
                console.error(error);
                return;
            }
            var action = deleteTodo(data.content.id);
            store.dispatch(action);
        });
    }

    return (
        <div
            className="main-container__delete"
            onTouchStart={function (event) {
                tapEvent(event, deleteItemList);
            }}>
        </div>
    );
};
