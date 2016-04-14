import React from 'react';

import fetchJSONHelper from '../fetchJSONHelper';

import {deleteTodo} from '../actions';

export default React.createClass({
    onClick(event) {
        event.preventDefault();

        fetch('/todos/delete',
            fetchJSONHelper('delete', {delId: this.props.selectedTodoId})
        )
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.props.store.dispatch(deleteTodo(data.delId));
        });
    },

    render() {
        return (
            <img className="todo-item__delete-button" src="/trash.jpg" onClick={this.onClick} />
        );
    }
});
