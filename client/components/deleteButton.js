import React from 'react';
import {deleteTodo} from '../actions';
import apiProvider from '../apiProvider';

export default React.createClass({
    componentDidMount() {
        this.refs.deleteButton.setAttribute('disabled', 'disable')
    },

    onClick(event) {
        event.preventDefault();
        if (event.target.className != this.refs.deleteButton.className || this.refs.deleteButton.disabled) {
            return;
        }
        var id = this.props.todoId;
        var store = this.props.store;
        apiProvider('/todos', 'delete', {id})
            .then(function (data) {
                store.dispatch(deleteTodo(data.id));
            });
    },
    
    render() {
        return (
            <input ref="deleteButton" type="button" className="todo__delete-button" onClick={this.onClick}/>
        );
    }
});
