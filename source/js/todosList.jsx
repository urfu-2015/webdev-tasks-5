import React from 'react';
import TodoItem from './todoItem.jsx';

export default ({todoItems, onDelete}) => (
    <div className="todo-list">
        {todoItems.map((todo, idx) => (
            <TodoItem key={todo.id} id={todo.id} text={todo.text}/>
        ))}
    </div>
);
