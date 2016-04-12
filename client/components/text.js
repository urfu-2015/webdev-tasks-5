'use strict';

import React from 'react';
import {showForm, showDelete, hideDelete} from '../actions';
import {getTodoId, swipeEvent, tapEvent} from '../modules/touch';

export default ({store, text}) => {
    function showFormElement(event) {
        tapEvent(event, function (error, event) {
            if (error) {
                console.error(error);
                return;
            }
            var action = showForm(getTodoId(event.currentTarget));
            store.dispatch(action);
        });
    }

    function showDeleteElement(event) {
        swipeEvent(event, 'left', function (error, event) {
            if (error) {
                console.error(error);
                return;
            }
            var action = showDelete(getTodoId(event.currentTarget));
            store.dispatch(action);
        });
    }

    function hideDeleteElement(event) {
        swipeEvent(event, 'right', function (error, event) {
            if (error) {
                console.error(error);
                return;
            }
            var action = hideDelete(getTodoId(event.currentTarget));
            store.dispatch(action);
        });
    }

    return (
        <div
            className="main-container__text"
            onTouchStart={function (event) {
                showFormElement(event);
                showDeleteElement(event);
                hideDeleteElement(event);
            }}>
            {text}
        </div>
    );
};
