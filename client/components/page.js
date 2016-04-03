import React from 'react';
import Header from './header';
import Reloader from './reloader';
import AddButton from './addButton';
import TodoList from './todoList';

export default ({store}) => {
    const {todos, selectedTodo, swipedTodo} = store.getState();
    return (
        <div>
            <Reloader />
                <TodoList todos={todos} selectedTodo={selectedTodo} swipedTodo={swipedTodo} store={store} />
            <AddButton store={store} />
        </div>
    );
};