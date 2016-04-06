'use strict';

import React from 'react';
import {changeTodo} from '../actions';
import {sendRequest} from '../modules/http';
import {getNodeIndex, tapEvent} from '../modules/touch';

export default ({store, text}) => {
    function updateItemList(error, event) {
        if (error) {
            console.error(error);
            return;
        }

        var node = event.currentTarget;
        var id = getNodeIndex(node.parentNode);
        var text = node.parentNode.firstChild.value;

        setTimeout(sendRequest('PUT', '/list', {id: id, content: text}, function (error, data) {
            if (error) {
                console.error(error);
                return;
            }
            if (data.status.indexOf('OK') >= 0) {
                var action = changeTodo(id, text);
                store.dispatch(action);
            }
        }), 0);
    }

    return (
        <div className="main-container__form">
            <textarea className="main-container__textarea">{text}</textarea>
            <button
                className="main-container__send"
                onTouchStart={function(event) {
                    tapEvent(event, updateItemList);
                }}>
                Изменить
            </button>
        </div>
    );
};
