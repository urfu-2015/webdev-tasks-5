import React from 'react';
import {onHorizontalSwipe, onVerticalSwipe} from '../touches';
import {createTodoOnClick} from '../todosOperations';
import Todo from './todo';
import {addTodo, deleteTodo} from '../actions';

export default React.createClass({
    componentDidMount() {
        onHorizontalSwipe(this.refs.todosContainer);

        var store = this.props.store;
        onVerticalSwipe(document.querySelector('body'), function () {
            fetch('/api/todos' + window.location.search)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    store.getState().todos.forEach(t => {
                        store.dispatch(deleteTodo(t.id));
                    });
                    data.todos.forEach(todo => {
                        store.dispatch(addTodo(todo));
                    });
                });

        });
    },
    render() {
        var store = this.props.store;
        return (
            <main>
                <div className="refresh-container">
                    <input type="checkbox" className="refresh-checker"/>
                    <img className="refresh-image"
                         src="//toodoohi.surge.sh/refresh.png"/>
                </div>
                <section ref="todosContainer" className="todos-container">
                    {
                        store.getState().todos
                            .map(todo => <Todo
                                store={store}
                                todo={todo}
                                key={todo.id}
                            />)
                    }
                    <article className="todo-item">
                        <input type="text" className="todo__create-form"/>
                        <input type="button" className="todo__submit-button"
                               onClick={createTodoOnClick.bind(this, store)}/>
                    </article>
                </section>
            </main>
        );
    }
});
