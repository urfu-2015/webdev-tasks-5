import React from 'react';
import {deleteTodo, changeTodo} from '../actions';
import {request} from '../httpRequest';

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const todo = this.props.todo;
        return (
            <div className={'todos-container__todo todo todo_id_' + todo._id
            + (todo.isDeleting? ' todo_swiped': '') + (todo.isChanging? ' todo_modification' : '')}>
                <div className={'todo__text' + (todo.isChanging? ' todo__text_hidden' : '')}>{todo.text}</div>
                <div className="todo__delete">X</div>
                <div className={'todo__form input-form' + (todo.isChanging? '' : ' todo__form_hidden')}>
                    <textarea className="input-form__input" defaultValue={todo.text}></textarea>
                    <button className="input-form__submit">Сохранить</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const todo = this.props.todo;
        const todoElement = document.querySelector(`.todo_id_${todo._id}`);

        todoElement.addEventListener('tap', (event) => {
            const todo = this.props.todo;

            if (!todo.isChanging && !todo.isDeleting) {
                this.props.store.dispatch(changeTodo(Object.assign({}, todo, {
                    isChanging: true
                })));
            }
        });

        todoElement.addEventListener('swipe-left', (event) => {
            const todo = this.props.todo;

            if (!todo.isChanging && !todo.isDeleting) {
                this.props.store.dispatch(changeTodo(Object.assign({}, todo, {
                    isDeleting: true
                })));
            }
        });

        todoElement.addEventListener('swipe-right', (event) => {
            const todo = this.props.todo;

            if (!todo.isChanging && todo.isDeleting) {
                this.props.store.dispatch(changeTodo(Object.assign({}, todo, {
                    isDeleting: false
                })));
            }
        });

        const deleteButton = document.querySelector(`.todo_id_${todo._id} .todo__delete`);

        deleteButton.addEventListener('tap', (event) => {
            const todo = this.props.todo;

            if (todo.isDeleting) {
                event.preventDefault();
                event.stopPropagation();

                request('DELETE', 'api/todos/' + todo._id, {}, () => {
                    this.props.store.dispatch(deleteTodo(todo._id));
                });
            }
        });

        const submitButton = document.querySelector(`.todo_id_${todo._id} .input-form__submit`);

        submitButton.addEventListener('tap', (event) => {
            const todo = this.props.todo;

            if (todo.isChanging) {
                const newText = document.querySelector(`.todo_id_${todo._id} .input-form__input`).value;

                event.preventDefault();
                event.stopPropagation();

                request('PATCH', 'api/todos/' + todo._id, { text: newText }, () => {
                    this.props.store.dispatch(changeTodo(Object.assign({}, todo, {
                        text: newText,
                        isChanging: false
                    })));
                });

            }
        });

    }
};

export default Todo;
