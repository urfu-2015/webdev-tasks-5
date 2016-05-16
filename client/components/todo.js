import React from 'react';
import {showEditForm} from '../javascript/todosOperations';
import SubmitButton from './submitButton';
import DeleteButton from './deleteButton';

export default React.createClass({
    render()
    {
        var store = this.props.store;
        var todo = this.props.todo;
        return (
            <div className="todo-item">
                <input type="checkbox" className="todo__edit-checkbox"
                       id={"edit-checkbox-" + todo.id}/>
                <label ref="todoItem" className="todo__text" htmlFor={"edit-checkbox-" + todo.id}
                       onClick={showEditForm}>{todo.text}
                </label>
                <DeleteButton store={store} todoId={todo.id}/>
                <input type="text" className="todo__edit-form"/>
                <SubmitButton store={store} todoId={todo.id}/>
            </div>
        );
    }
});
