import React from 'react';

import TodoItem from './todoItem';
import AddTodo from './addTodo';

export default React.createClass({
    render() {
        const {todos, selectedTodoId, editingTodoId} = this.props.store.getState();

        return (
            <section id="todoSection" className="todo">
                {
                    todos.map(
                        todo => (
                            <TodoItem
                                key={todo.id + '_' + Math.random()}
                                id={todo.id}
                                text={todo.text}
                                editingTodoId={editingTodoId}
                                selectedTodoId={selectedTodoId}
                                store={this.props.store}
                            />
                        )
                    )
                }
                <AddTodo
                    store={this.props.store}
                />
            </section>
        );
    }
});
