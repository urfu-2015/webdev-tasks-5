'use strict';

import React from 'react';
import {deleteTodo} from '../actions';
import {sendRequest} from '../modules/http';
import {getNodeIndex, tapEvent} from '../modules/touch';

export default ({store}) => {
    function deleteItemList(error, event) {
        if (error) {
            console.error(error);
            return;
        }

        var id = getNodeIndex(event.currentTarget);

        setTimeout(sendRequest('DELETE', '/list', {id: id}, function (error, data) {
            if (error) {
                console.error(error);
                return;
            }
            if (data.status.indexOf('OK') >= 0) {
                var action = deleteTodo(id);
                store.dispatch(action);
            }
        }), 0);
    }

    return (
        <div
            className="main-container__delete"
            onTouchStart={function(event) {
                tapEvent(event, deleteItemList);
            }}>
        </div>
    );
};
