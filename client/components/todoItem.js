import React from 'react';

import eventsLogic from '../eventsLogic';

import DeleteButton from './deleteButton';

export default React.createClass({
    render() {
        return (
            <div id={"todo_" + this.props.id} className="todo-item">
                <div className="todo-item__elem"
                     onTouchStart={eventsLogic(this.props.store).onTouchStart}
                     onTouchEnd={
                        eventsLogic(this.props.store, this.props.selectedTodoId).onTouchEnd
                    }>
                    {
                        this.props.editingTodoId === this.props.id ?
                            <form>
                                <input
                                    id="editInput"
                                    className="todo-edit__input"
                                    placeholder={this.props.text}
                                    maxLength="12"
                                    autoFocus
                                />
                                <button className="todo-edit__save-button">
                                    Сохранить
                                </button>
                            </form> :
                            <span className="todo-item__title off-events">{this.props.text}</span>
                    }
                </div>
                {
                    this.props.selectedTodoId === this.props.id ?
                        <DeleteButton
                            selectedTodoId={this.props.selectedTodoId}
                            store={this.props.store} /> : null
                }
            </div>
        );
    }
});
