import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false,
            todoItemStill: true,
            todoItemMovedLeft: false,
            todoItemMovedRight: false
        };
        this.startPoint = {};
    }

    componentWillMount() {
        //React.initializeTouchEvents(true);
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
        // console.log(event.currentTarget);
        // console.log(event.target);
        //event.stopPropagation();
        // Если в состоянии сдвига попали на корзину -> удаляем
        // Проблема в том, что слой корзины лежит ниже самого TodoItem
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
        //event.stopPropagation();
        let nowPoint = event.changedTouches[0];
        var offset = {
            x: [nowPoint.pageX - this.startPoint.x],
            y: [nowPoint.pageY - this.startPoint.y]
        };
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
            this.startPoint = {x: nowPoint.pageX, y: nowPoint.pageY};
        }
    }

    handleTouchEnd(event) {
        //event.stopPropagation();
        //clearTimeout(editFormTimer);
        var pdelay = new Date();
        let nowPoint = event.changedTouches[0];
        var xAbs = Math.abs(this.startPoint.x - nowPoint.pageX);
        var yAbs = Math.abs(this.startPoint.y - nowPoint.pageY);
        // Если сдвинули палец на короткое расстояние и быстро
        if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime() - this.ldelay.getTime()) < 200) {
            if (xAbs > yAbs) {
                if (nowPoint.pageX < this.startPoint.x) {
                    console.log('Left swipe touchend');
                    this.leftSwipeHandler.bind(this)(event);
                }
                else {
                    console.log('Right swipe touchend');
                    this.rightSwipeHandler.bind(this)(event);
                }
            }
        }
    }

    leftSwipeHandler(event) {
        this.setState({todoItemMovedLeft: true});
    }

    rightSwipeHandler(event) {
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
                 onTouchEnd={this.handleTouchEnd.bind(this)}
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
