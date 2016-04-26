import React from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';
import Todo from  './todoItem';
import ReactDom from 'react-dom';
import classNames from 'classnames';
//var initialPoint;
//var finalPoint;
//
var initialUpdatePoint;
var finalUpdatePoint;
var root = React.createElement('div');
module.exports = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            update: true,
            editing: -1,
            trashing: -1
        }
    },
    loadTodosFromServer: function () {
        var self = this;
        self.setState({update: true});
        fetch('/api/v1/todo').then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.setState({data: data});
                self.setState({update: false});
            });
    },
    createTodo: function (todo) {

        var formData = new FormData();
        var todos = this.state.data;
        var self = this;
        formData.append('todo', todo);
        var newTodo = {id: todos.length, todo: todo};
        todos.unshift(newTodo);
        fetch('/api/v1/todo/', {
            method: 'POST',
            body: formData
        }).then(function () {
            self.setState({data: todos});
        });
    },
    onTodoUpdate: function (todo) {
        var todos = this.state.data;

        var index = todos.map(function (item) {
            return item.id
        }).indexOf(todo.id);
        todos[index] = todo;
        var editing_id = todo.id;
        var formData = new FormData();
        formData.append('todo', todo.todo);
        formData.append('id', todo.id);
        formData.append('dateUpdate', todo.dateUpdate);
        formData.append('dateCreate', todo.dateCreate);
        var self = this;
        fetch('/api/v1/todo/' + index, {
            method: 'PUT',
            body: formData
        }).then(function () {
            self.setState({data: todos});
            if (self.state.editing === editing_id) {
                self.setState({editing: -1});
            }
            self.setState({trashing: -1});
        });
    },
    onTodoDestroy: function (todo_id) {
        var self = this;
        var todos = this.state.data;
        var index = todos.map(function (item) {
            return item.id
        }).indexOf(parseInt(todo_id));
        fetch('/api/v1/todo/' + index, {
            method: 'DELETE'
        }).then(function () {
            todos.splice(index, 1);
            self.setState({data: todos});
        });
    },
    updateTouchStart: function (event) {
        //event.preventDefault();
        initialUpdatePoint = event.changedTouches[0];
    },
    updateTouchEnd: function (event) {
        var self = this;
        //event.stopPropagation();
        finalUpdatePoint = event.changedTouches[0];
        var xAbs = Math.abs(initialUpdatePoint.pageX - finalUpdatePoint.pageX);
        var yAbs = Math.abs(initialUpdatePoint.pageY - finalUpdatePoint.pageY);
        var element = event.currentTarget;
        if (xAbs > 20 || yAbs > 20) {
            if (xAbs < yAbs) {
                event.preventDefault();
                self.setState({update: true});
                if (finalUpdatePoint.pageY > initialUpdatePoint.pageY) {
                    setTimeout(function () {
                        self.loadTodosFromServer();
                    }, 2000);
                }
            }
        }
    },

//},
    componentDidMount: function () {
        this.loadTodosFromServer();
    },
    edit: function (todo) {
        this.setState({editing: todo.id});
    },
    trash: function (todo, view_trash) {
        if (view_trash) {
            this.setState({trashing: todo.id});
        } else {
            this.setState({trashing: -1});
        }
    },
    render: function () {
        return (
            <div
                onTouchStart={this.updateTouchStart} onTouchEnd={this.updateTouchEnd} className={classNames({
                    'todo-list--update': this.state.update
                })}
            >
                <img src="/images/loading.gif" className="todo-list--preload"/>
                <div className="todo-list">
                    {this.state.data.map(function (todo, i) {
                        var onTodoDestroy = this.onTodoDestroy;
                        var onTodoUpdate = this.onTodoUpdate;
                        return (
                            <Todo
                                key={todo.id}
                                id={todo.id}
                                todo={todo.todo}
                                dateCreate={todo.dateCreate}
                                dateUpdate={todo.dateUpdate}
                                onTodoUpdate={onTodoUpdate}
                                onTodoDestroy={onTodoDestroy}
                                editing={this.state.editing === todo.id}
                                trashing={this.state.trashing === todo.id}
                                onEdit={this.edit.bind(this, todo)}
                                onTrash={this.trash.bind(this, todo)}
                            />
                        );
                    }, this)}
                </div>
                <TodoForm onTodoSubmit={this.createTodo}/>
            </div>
        );
    }
});


var TodoForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var taskInput = ReactDom.findDOMNode(this.refs.todo);
        var taskValue = taskInput.value.trim();
        if (taskValue !== '') {
            this.props.onTodoSubmit(taskValue);
            taskInput.value = '';
        }

    },
    render: function () {
        return (
            <form onSubmit={this.handleSubmit} className="todo-input">
                <input type="text" className="todo-form__input" ref="todo"/>
                <input type="submit" className="todo-form__button" value="Добавить todo"/>
            </form>
        );
    }
});
