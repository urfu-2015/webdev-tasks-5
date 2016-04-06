'use strict';

import React from 'react';
import {showForm, showDelete, hideDelete} from '../actions';
import {getNodeIndex, swipeEvent, tapEvent} from '../modules/touch';

export default ({store, text}) => {
    function showFormElement(event) {
        tapEvent(event, function (error, event) {
            if (error) {
                console.error(error);
                return;
            }
            var action = showForm(getNodeIndex(event.currentTarget));
            store.dispatch(action);
        });
    }

    function showDeleteElement(event) {
        swipeEvent(event, 'left', function (error, event) {
            if (error) {
                console.error(error);
                return;
            }
            var action = showDelete(getNodeIndex(event.currentTarget));
            store.dispatch(action);
        });
    }

    function hideDeleteElement(event) {
        swipeEvent(event, 'right', function (error, event) {
            if (error) {
                console.error(error);
                return;
            }
            var action = hideDelete(getNodeIndex(event.currentTarget));
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
