import React from 'react';
import TodosContainer from './todosContainer'
import {addTodo} from '../actions';
import {request} from '../httpRequest';


class TodosPage extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const {todos} = this.props.store.getState();
        return (
            <div className="root">
                <div className="root__load"></div>
                <h1 className="root__header">TODO-хи</h1>
                <TodosContainer todos={todos} store={this.props.store}/>
                <button className="root__add-button">Добавить</button>
            </div>
        );
    }

    componentDidMount() {
        const addButton = document.querySelector('.root__add-button');

        addButton.addEventListener('tap', (event) => {
            request('POST', 'api/todos', { text: 'Новое дело' }, (todo) => {
                this.props.store.dispatch(addTodo(Object.assign({}, todo, {
                    isChanging: true,
                    isDeleting: false
                })));
            });

        });
    }
}

export default TodosPage;