import React from 'react';
import ReactDom from 'react-dom';
import {deleteTodo, updateTodo} from './lib.jsx';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            swiped: false,
            state: 'view',
            text: props.text,
            show: true
        };
        this._id = props.id;

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onDeleteButtonTouch = this.onDeleteButtonTouch.bind(this);
        this.onSaveButtonTouch = this.onSaveButtonTouch.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    onTouchStart(event) {
        event.preventDefault();
        event.stopPropagation();
        this.startPoint = event.changedTouches[0];

        var self = this;
        if (!this.state.swiped) {
            setTimeout(function () {
                if (!self.state.swiped) {
                    self.setState({swiped: false, state: 'edit'});
                }
            }, 100);
        }

        this.setState({swiped: false});
    }

    onTouchMove(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.swiped) {
            return;
        }
        var newPoint = event.changedTouches[0];
        var dx = newPoint.pageX - this.startPoint.pageX;
        this.setState({swiped: dx < -1});

        this.startPoint = newPoint;
    }

    onDeleteButtonTouch(event) {
        var node = ReactDom.findDOMNode(this);
        var self = this;
        deleteTodo(this._id, function (err) {
            if (err) {
                return alert(err);
            }

            self.setState({show: false});
        });
    }

    onSaveButtonTouch(event) {
        var self = this;
        var currentText = event.target.previousElementSibling.value;
        updateTodo(this._id, currentText, function (err) {
            if (err) {
                return alert(err);
            }

            self.setState({state: 'view'});
        });
    }

    handleChanges(event) {
        this.setState({text: event.target.value});
    }

    render() {
        if (!this.state.show) {
            return false;
        }
        var itemClass = 'item ' + (this.state.swiped ? 'item--swiped' : '');
        if (this.state.state === 'view') {
            return (
                <div className='todo-list__item-block'>
                    <div className={itemClass} onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}>{this.state.text}</div>
                    <div className="button" type="button" onTouchStart={this.onDeleteButtonTouch}></div>
                </div>
            )
        } else {
            return (
                <div className="todo-list__edit-block">
                    <div className="edit">
                        <textarea className="text" rows="3"  onChange={this.handleChanges} value={this.state.text} />
                        <button className="button" type="button" onTouchStart={this.onSaveButtonTouch}>Сохранить</button>
                    </div>
                </div>
            );
        }
    }
}

export default TodoItem
