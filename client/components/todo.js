import React from 'react';

import TodoItem from './todoItem';
import AddTodo from './addTodo';

export default ({store}) => {
    const {todos, selectedTodoId, editingTodoId} = store.getState();

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
                            store={store}
                        />
                    )
                )
            }
            <AddTodo
                store={store}
            />
        </section>
    );
};
