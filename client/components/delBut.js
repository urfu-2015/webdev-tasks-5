import React from 'react';

import {deleteTodo} from '../actions';

export default ({selectedTodoId, store}) => {
    function onClick(event) {
        event.preventDefault();

        fetch('/todos/delete',
            {
                method: "delete",
                headers: new Headers({'Content-type': 'application/json'}),
                body: JSON.stringify({delId: selectedTodoId})
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                store.dispatch(deleteTodo(data.delId));
            });
    }

    return (
        <img className="todo-item__delete-button" src="/trash.png" onClick={onClick} />
    );
};
