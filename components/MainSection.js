import React, {Component, PropTypes} from 'react'
import TodoItem from './TodoItem'

class MainSection extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {todos, actions} = this.props;

        return (
            <section className="todo-app">
                {todos.map(todo =>
                    <TodoItem key={todo.id} todo={todo} {...actions} />
                )}
            </section>
        )
    }
}

MainSection.propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

export default MainSection
