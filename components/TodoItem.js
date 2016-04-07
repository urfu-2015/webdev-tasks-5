import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false,
            todoItemStill: true
        };
    }

    componentWillMount() {
        //React.initializeTouchEvents(true);
        this.startPoint = {};
    }

    handleClick() {
        this.setState({editing: true})
    }

    handleSave(id, text) {
        if (text.length === 0) {
            this.props.deleteTodo(id)
        } else {
            this.props.editTodo(id, text)
        }
        this.setState({editing: false})
    }

    handleTouchStart(event) {
        console.log(event.currentTarget);
        console.log(event.target);
        event.stopPropagation();
        if (this.state.todoItemMovedLeft) {
            if (event.target.className === 'todo') {
                this.props.deleteTodo(this.props.todo.id);
            }
        }
        this.startPoint.x = event.changedTouches[0].pageX;
        this.startPoint.y = event.changedTouches[0].pageY;
        this.ldelay = new Date();
    }

    handleTouchMove(event) {
        event.stopPropagation();
        var offset = {};
        this.nowPoint = event.changedTouches[0];
        offset.x = this.nowPoint.pageX - this.startPoint.x;
        offset.y = this.nowPoint.pageY - this.startPoint.y;
        if (Math.abs(offset.x) > 150) {
            if (offset.x < 0) {
                // Показать корзину
                console.log('Left swipe on touchmove');
                //console.log(event);
                this.leftSwipeHandler.bind(this)(event);
            }
            if (offset.x > 0) {
                // Убрать корзину
                console.log('Right swipe on touchmove');
                //console.log(event);
                this.rightSwipeHandler.bind(this)(event);
            }
            this.startPoint = {x: this.nowPoint.pageX, y: this.nowPoint.pageY};
        }
    }

    leftSwipeHandler(event) {
        var leftSwipe = event.changedTouches[0];
        this.setState({todoItemMovedLeft: true});
    }

    rightSwipeHandler(event) {
        var rightSwipe = event.changedTouches[0];
        if (this.state.todoItemMovedLeft) {
            this.setState({todoItemMovedRight: true});
            setTimeout(() => {
                this.setState({todoItemMovedRight: false, todoItemMovedLeft: false});
            }, 400);
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
            'todo__item': this.state.todoItemStill,
            'animate-left': this.state.todoItemMovedLeft,
            'animate-right': this.state.todoItemMovedRight
        });
        var todoTextClass = classnames({
            'todo__text': this.state.todoItemStill,
            'animate-left': this.state.todoItemMovedLeft,
            'animate-right': this.state.todoItemMovedRight
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
            >
                <img id={imgId} className="todo__trashbox" src="/static/trashbox.png"/>
                <article id={itemId} className={todoItemClass}>
                    {element}
                </article>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoItem
