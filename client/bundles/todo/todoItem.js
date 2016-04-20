import React from 'react';
import classNames from 'classnames';
import ReactDom from 'react-dom';
var initialPoint;
var finalPoint;

module.exports = React.createClass({
    viewTrash: function (event) {
        var element = event.currentTarget;
        event.preventDefault();
        finalPoint = event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs === 0 && yAbs === 0) {
            if (event.target.tagName.toLowerCase() != "img") {
                event.preventDefault();
                this.props.onEdit();
                var node = ReactDom.findDOMNode(this.refs.editField);
                node.focus();
                node.blur();
            }
        } else if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX) {
                    this.props.onTrash(true);
                }
                else {
                    this.props.onTrash(false);
                }
            }
        }

    },
    onTouchStart: function (event) {
        event.preventDefault();
        initialPoint = event.changedTouches[0];
    },


    updateTodo: function (event) {
        var todo_input = event.target;
        var parentElement = todo_input.parentElement;

        var todo = {
            id: this.props.id,
            todo: todo_input.value,
            dateCreate: this.props.dateCreate,
            dateUpdate: this.props.dateUpdate
        };
        this.props.onTodoUpdate(todo);
    },
    delTodoTap: function (event) {
        if (event.targetTouches.length == 1) {
            var element = event.target;
            var parentElement = element.parentElement;
            this.props.onTodoDestroy(parentElement.id);
        }
    },
    render: function () {
        return (
            <section id={this.props.id} className={classNames(
                    'todo-list__item',{
                    'todo-list__item--editing': this.props.editing,
                    'todo-list__item--trashing': this.props.trashing
                })}
                     onTouchStart={this.onTouchStart} onTouchEnd={this.viewTrash}
            >
                <div className="todo-list__item_text">
                    {this.props.todo}
                </div>
                <input ref="editField" className="todo-list__item_input"
                       defaultValue={this.props.todo}
                       onBlur={this.updateTodo}/>
                <img src="/images/trash.png" className="todo-list__item_trash"
                     onTouchStart={this.delTodoTap}
                />
            </section>
        );
    }
});