'use strict';

import React from 'react';
import {changeTodo} from '../actions';
import {sendRequest} from '../modules/http';
import {getTodoId, tapEvent} from '../modules/touch';

export default ({store, text}) => {
    function updateItemList(error, event) {
        if (error) {
            console.error(error);
            return;
        }

        var node = event.currentTarget.parentNode;
        var id = getTodoId(node);
        var text = node.firstChild.value;

        sendRequest('PUT', '/list', {id: id, content: text}, function (error, data) {
            if (error) {
                console.error(error);
                return;
            }
            var action = changeTodo(data.content.id, data.content.text);
            store.dispatch(action);
        });
    }

    return (
        <div className="main-container__form">
            <textarea className="main-container__textarea">{text}</textarea>
            <button
                className="main-container__send"
                onTouchStart={function (event) {
                    tapEvent(event, updateItemList);
                }}>
                Изменить
            </button>
        </div>
    );
};
