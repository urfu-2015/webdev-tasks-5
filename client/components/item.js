'use strict';

import React from 'react';
import Form from './form';
import Text from './text';
import Delete from './delete';

export default ({store, todo}) => {
    var content = todo.edit ?
        <Form store={store} text={todo.text} /> :
        <Text store={store} text={todo.text} />;
    var deleteButton = todo.delete ? <Delete store={store} /> : null;

    return (
        <div className="main-container__item" data-todo-id={todo.id}>
            {content}
            {deleteButton}
        </div>
    );
};
