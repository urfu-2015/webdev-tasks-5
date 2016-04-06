'use strict';

import React from 'react';
import Item from './item';

export default ({store}) => {
    const {listTodo} = store.getState();

    return (
        <div className="main-container__list">
            {listTodo.map((note, index) => (
                <Item store={store} id={index} />
            ))}
       </div>
    );
};

