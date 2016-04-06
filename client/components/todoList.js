import React from 'react';
import TodoElement from './todoElement';
import Header from './header';

export default ({todos, selectedTodo, swipedTodo, store}) => (
    <div className="container">
        <Header />
        {todos.map((todo, i) => (
            <TodoElement
                id={i}
                key={i}
                value={todo}
                isChange={i == selectedTodo}
                isDelete={i == swipedTodo}
                store={store}
            />
        ))}
    </div>
);