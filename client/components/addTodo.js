import React from 'react';

import {addTodo} from '../actions';

export default ({store}) => {
    function onClick(event) {
        event.preventDefault();

        var newText = document.getElementById('newTodoText').value;

        if (newText !== '') {
            fetch('/todos/add',
                {
                    method: "put",
                    headers: new Headers({'Content-type': 'application/json'}),
                    body: JSON.stringify({text: newText})
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    store.dispatch(addTodo(data));
                    document.getElementById('newTodoText').value = '';
                });
        }
    }

    return (
        <div id="addTodo" className="todo-item">
            <div className="todo-item__elem">
                <form className="todo-add" method="put">
                    <input id="newTodoText" className="todo-add__input" maxLength="12"
                           placeholder="Введите вашу ТуДу-Ху =)" />
                    <a className="todo-item-add__add-button" onClick={onClick}>Добавить</a>
                </form>
            </div>
        </div>
    );
};
