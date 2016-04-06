import React from 'react';
import Todo from './todo';

class TodosContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="root__todos-container todos-container">
                {this.props.todos.map(todo => (
                    <Todo
                        todo={todo}
                        store={this.props.store}
                    />
                ))}
            </div>
        );
    }
}

export default TodosContainer;