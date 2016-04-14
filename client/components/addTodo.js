import React from 'react';

import fetchJSONHelper from '../fetchJSONHelper';

import {addTodo} from '../actions';

export default React.createClass({
    onClick(event) {
        event.preventDefault();

        var newTodoText = this.refs.newTodoText.value;

        if (newTodoText !== '') {
            fetch('/todos/add',
                fetchJSONHelper('put', {text: newTodoText})
            )
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.props.store.dispatch(addTodo(data));
                this.refs.newTodoText.value = '';
            });
        }
    },

    render() {
        return (
            <div id="addTodo" className="todo-item">
                <div className="todo-item__elem">
                    <form className="todo-add" method="put">
                        <input ref="newTodoText" className="todo-add__input" maxLength="12"
                               placeholder="Введите вашу ТуДу-Ху =)" />
                        <a className="todo-item-add__add-button" onClick={this.onClick}>Добавить</a>
                    </form>
                </div>
            </div>
        );
    }
});
