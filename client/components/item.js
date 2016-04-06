'use strict';

import React from 'react';
import Form from './form'
import Text from './text'
import Delete from './delete'

export default ({store, id}) => {
    var {listTodo} = store.getState();

    var content = listTodo[id].edit ?
        <Form store={store} text={listTodo[id].text} /> :
        <Text store={store} text={listTodo[id].text} />;
    var deleteButton = listTodo[id].delete ? <Delete store={store} /> : null;

    return (
        <div className="main-container__item">
            {content}
            {deleteButton}
        </div>
    );
};
