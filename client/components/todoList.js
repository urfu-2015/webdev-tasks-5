import React from 'react';
import TodoElement from './todoElement';
import Header from './header';

export default ({todos, isReloader, selectedTodo, swipedTodo, store, shiftY, shiftX}) => (
    <div className="container">
        <Header />
        {todos.map((todo, i) => (
            <TodoElement
                id={i}
                key={i}
                value={todo}
                isReloader={isReloader}
                isChange={i == selectedTodo}
                isDelete={i == swipedTodo}
                shiftX={shiftX}
                shiftY={shiftY}
                store={store}
            />
        ))}
    </div>
);