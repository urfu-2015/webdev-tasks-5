import React from 'react';
import {editTodo} from '../actions';
import apiProvider from '../apiProvider';


export default React.createClass({
    onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        var store = this.props.store;
        var checkbox = event.target.parentElement.querySelector('.todo__edit-checkbox');
        var textBox = event.target.parentElement.querySelector('.todo__edit-form');
        var text = textBox.value;
        if (text === '') {
            return;
        }
        apiProvider('/todos', 'put', {text, id: this.props.todoId})
            .then(function (data) {
                store.dispatch(editTodo(data));
            });
        textBox.value = "";
        checkbox.checked = false;
    },

    render() {
        return (
            <input type="button" className="todo__submit-button"
                onClick={this.onClick}/>
        );
    }
});
