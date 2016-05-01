import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false,

            swipedLeft: false,
            startMovingLeft: false,
            startMovingRight: false,
            moveOffset: 0,
            startOffset: 0
        };
        this.startPoint = {};
        this.toDelete;
    }

    componentWillMount() {
        //React.initializeTouchEvents(true);
    }

    handleClick() {
        const {todo, swipe} = this.props;
        
        if (this.state.moveOffset === 0) {
            this.setState({editing: true})
        }
    }

    handleSave(id, text) {
        if (text.length === 0) {
            this.props.deleteTodo(id)
        } else {
            this.props.editTodo(id, text)
        }
        this.setState({editing: false})
    }

    handleTrashBox() {
        const {todo, swipe} = this.props;
        if (this.state.moveOffset === -100) {
            if (swipe.tap.target.className === 'todo') {
                this.props.deleteTodo(this.props.todo.id);
            }
        }
    }

    handleTouchStart(event) {
    }

    handleTouchMove(event) {
        const {todo, swipe} = this.props;
        if (swipe.horizontalSwipe.state) {
            let newSwipePos = parseInt(this.state.startOffset, 10) + swipe.horizontalSwipe.offset;
            console.log(this.state.startOffset, this.state.moveOffset, swipe.horizontalSwipe.offset, newSwipePos);
            if (newSwipePos <= -100) {
                this.setState({
                    moveOffset: -100,
                    startOffset: -100
                });
            } else if (newSwipePos > 0) {
                this.setState({
                    moveOffset: 0,
                    startOffset: 0
                });
            } else {
                this.setState({
                    moveOffset: newSwipePos
                });
            }
        }
    }

    componentDidUpdate(nextProps, nextState) {
        const {todo, swipe} = this.props;

        // Проверим, тапал ли кто-нибудь глобально
        if (swipe.tap.target) {
            this.handleTrashBox.bind(this)();
        }

        // Если начали скролить - закрываем корзину
        if (swipe.verticalSwipe.state) {
            if (this.state.moveOffset === -100) {
                this.setState({
                    moveOffset: 0,
                    startOffset: 0
                });
            }
        }
    }

    handleTouchEnd(event) {
        const {todo, swipe} = this.props;
        //this.handleTrashBox.bind(this)(event);
        if (this.state.moveOffset != -100 && this.state.moveOffset != 0) {
            let newSwipePos = parseInt(this.state.startOffset, 10) + swipe.horizontalSwipe.offset;
            if (Math.abs(Math.abs(this.state.moveOffset) - 100) > Math.abs(this.state.moveOffset)) {
                this.setState({
                    moveOffset: 0,
                    startOffset: 0
                });
            } else {
                this.setState({
                    moveOffset: -100,
                    startOffset: -100
                });
            }
        }
    }

    render() {
        const {todo, deleteTodo} = this.props;

        let element;
        let todoTextId = `todo__text-${todo.id}`;
        let imgId = `todo__trashbox-${todo.id}`;
        let itemId = `todo__item-${todo.id}`;
        let todoId = `todo-${todo.id}`;

        var todoItemClass = classnames({
            'todo__item': true
        });
        var todoTextClass = classnames({
            'todo__text': true
        });
        if (this.state.editing) {
            element = (
                <p id={todoTextId} className={todoTextClass}>
                    <TodoTextInput
                        text={todo.text}
                        editing={this.state.editing}
                        onSave={(text) => this.handleSave(todo.id, text)}
                        todoId={todoId}
                    />
                </p>
            )
        } else {
            element = (
                <p id={todoTextId} className={todoTextClass} onClick={this.handleClick.bind(this)}>
                    {todo.text}
                </p>
            )
        }
        return (
            <div className="todo" id={todoId}
                 onTouchStart={this.handleTouchStart.bind(this)}
                 onTouchMove={this.handleTouchMove.bind(this)}
                 onTouchEnd={this.handleTouchEnd.bind(this)}
            >
                <img id={imgId} className="todo__trashbox" src="/static/trashbox.png"/>
                <article
                    style={{transform: ' translate(' + this.state.moveOffset + 'px)'}}
                    id={itemId} className={todoItemClass}>
                    {element}
                </article>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    swipe: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoItem
