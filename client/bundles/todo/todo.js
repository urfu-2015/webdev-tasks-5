import React from 'react';
import Header from '../header/header.js';
import Footer from '../footer/footer.js';

var initialPoint;
var finalPoint;

var initialUpdatePoint;
var finalUpdatePoint;

const TodoItem = ({text, todo_id}) => (
    <section id={todo_id} className="todo-list__item" onTouchStart={onTouchStart}
             onTouchEnd={viewTrash}>
        <div className="todo-list__item_text">
            {text}
        </div>
        <input className="todo-list__item_input  todo-form__input" defaultValue={text}
               onBlur={updateTodo}/>
        <img src="/images/trash.png" className="todo-list__item_trash" onTouchStart={delTodoTap}/>
    </section>
);
function onTouchStart(event) {
    event.preventDefault();
    initialPoint = event.changedTouches[0];
}
function viewTrash(event) {
    var element = event.currentTarget;
    event.preventDefault();
    finalPoint = event.changedTouches[0];
    var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
    var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
    if (xAbs === 0 && yAbs === 0) {
        if (event.target.tagName.toLowerCase() != "img") {
            var todo_input = element.querySelector('.todo-list__item_input');
            var todo_text = element.querySelector('.todo-list__item_text');
            todo_text.style = 'display:none';
            todo_input.style = 'display:block';
            todo_input.focus();
        }
    } else if (xAbs > 20 || yAbs > 20) {
        var todo_trash = element.querySelector('.todo-list__item_trash');
        if (xAbs > yAbs) {
            if (finalPoint.pageX < initialPoint.pageX) {
                todo_trash.style = 'display:block';
                /*СВАЙП ВЛЕВО*/
            }
            else {
                todo_trash.style = 'display:none';
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

function updateTouchStart() {
    event.preventDefault();
    initialUpdatePoint = event.changedTouches[0];
}

function updateTouchEnd() {
    event.preventDefault();
    //event.stopPropagation();
    finalUpdatePoint = event.changedTouches[0];
    var xAbs = Math.abs(initialUpdatePoint.pageX - finalUpdatePoint.pageX);
    var yAbs = Math.abs(initialUpdatePoint.pageY - finalUpdatePoint.pageY);
    var element = event.currentTarget;
    console.log(element);
    if (xAbs > 20 || yAbs > 20) {
        if (xAbs < yAbs) {
            if (finalPoint.pageY > initialPoint.pageY) {
                update('d');
            }
        }
    }
}

export default ({todos}) => (
    <div onTouchStart={updateTouchStart} onTouchEnd={updateTouchEnd}>
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
