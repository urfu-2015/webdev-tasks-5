import React from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';

var initialPoint;
var finalPoint;

const TodoItem = ({text, todo_id}) => (
    <section id={todo_id} className="todo-list__item" onTouchStart={onTouchStart}
             onTouchEnd={viewTrash}>
        <div className="todo-list__item_text">
            {text}
        </div>
        <input className="todo-list__item_input" onBlur={updateTodo}/>
        <img src="/images/trash.png" className="todo-list__item_trash" onTouchStart={delTodoTap}/>
    </section>
);
function onTouchStart(event) {
    event.preventDefault();
    event.stopPropagation();
    initialPoint = event.changedTouches[0];
}
function viewTrash(event) {

    event.preventDefault();
    event.stopPropagation();
    finalPoint = event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs === 0 && yAbs === 0) {
        var element = event.target;
        var todo_input = element.querySelector('.todo-list__item_input');
        var todo_text = element.querySelector('.todo-list__item_text');
        todo_input.style = 'display:block';
        todo_text.style = 'display:none';
    }
    if (xAbs > 20 || yAbs > 20) {
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX) {
                alert('l');
                /*СВАЙП ВЛЕВО*/
            }
            else {
                alert('r');
                /*СВАЙП ВПРАВО*/
            }
        }
    }

}
function updateTodo(event) {
    var todo_input = event.target;
    var parentElement = todo_input.parentElement;
    var formData = new FormData();
    formData.append('todo', todo_input.value);
    fetch('/api/v1/todo/' + parentElement.id, {
        method: 'PUT',
        body: formData
    });
    var todo_div = parentElement.querySelector('.todo-list__item_text');
    todo_input.style = 'display:none';
    todo_div.style = 'display:block';
}

function tapTodo(event) {
    if (event.targetTouches.length == 1) {

        var parentElement = element.parentElement.parentElement;

        console.log(element);
        console.log(parentElement);

    }
}

function delTodoTap(event) {
    if (event.targetTouches.length == 1) {
        var element = event.target;
        var parentElement = element.parentElement;

        fetch('/api/v1/todo/' + parentElement.id, {
            method: 'DELETE'
        });
    }
}

function onSubmitTodoForm(event) {
    event.preventDefault();
    fetch('/api/v1/todo/', {
        method: 'POST',
        body: new FormData(event.target)
    });
    return false;
}

const TodoForm = (todos) => (
    <form onSubmit={onSubmitTodoForm} className="todo-form">
        <input type="text" name="todo" className="todo-form__input"/>
        <input type="submit" className="todo-form__button" value="Добавить todo"/>
    </form>
);


export default ({todos}) => (
    <div>
        <div className="todo-list">
            {todos.map(todo => (

                <TodoItem
                    text={todo.todo}
                    todo_id={todo.id}
                />
            ))}

        </div>
        <TodoForm />
    </div>
)
