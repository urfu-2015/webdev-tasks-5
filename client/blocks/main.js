'use strict';

import React from 'react';
import Item from './item';

function contextMenu(event) {
    event.preventDefault();
}

export default ({store}) => {

    const {notes} = store.getState();

    var id = -1;
    var order = -1;

    function getID() {
        id += 1;
        return id;
    }

    function getOrder() {
        order += 1;
        return order;
    }

    if (!notes.length) {
        return (
            <div className="container">
                <p className="container_notfound">Notes not found!</p>
            </div>
        );
    }

    return (
        <div className="container">
            {notes.map(note => (
                <div key={getID()}
                     style={{order: getOrder()}}
                     className="container__item"
                     onContextMenu={contextMenu}>
                    <Item store={store} name={note} />
                </div>
            ))}
        </div>
    );
};
